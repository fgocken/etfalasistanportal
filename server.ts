import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFParse } from 'pdf-parse';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '15mb' }));

// Persistent storage directory for rosters
const DATA_DIR = path.join(__dirname, 'data');
const ROSTERS_FILE = path.join(DATA_DIR, 'rosters.json');
const SCHEDULE_FILE = path.join(DATA_DIR, 'weekly_schedule.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (e) {
    console.error('Could not create data dir:', e);
  }
}

function sanitizeRoster(roster: any): any {
  if (!roster || !roster.days) return roster;
  const turkishDays = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const dateKeys = Object.keys(roster.days).sort();
  const [expectedYearStr, expectedMonthStr] = String(roster.monthKey || '').split('-');
  const expectedMonth = parseInt(expectedMonthStr, 10);
  const expectedYear = parseInt(expectedYearStr, 10);

  let needsShiftCorrection = false;
  if (expectedMonth && expectedYear && dateKeys.length > 0) {
    const prevMonth = expectedMonth === 1 ? 12 : expectedMonth - 1;
    const hasPreviousMonthKeys = dateKeys.some(k => {
      const parts = k.split('-');
      return parseInt(parts[1], 10) === prevMonth;
    });
    if (hasPreviousMonthKeys) {
      needsShiftCorrection = true;
    }
  }

  const days: Record<string, any> = {};

  if (needsShiftCorrection) {
    dateKeys.forEach((oldKey, idx) => {
      const dayNum = idx + 1;
      const dayStr = String(dayNum).padStart(2, '0');
      const monthStr = String(expectedMonth).padStart(2, '0');
      const newKey = `${expectedYear}-${monthStr}-${dayStr}`;
      const formattedDate = `${dayStr}.${monthStr}.${expectedYear}`;

      const d = new Date(expectedYear, expectedMonth - 1, dayNum, 12, 0, 0);
      const dow = d.getDay();
      const dayName = turkishDays[dow];
      const isWeekend = dow === 0 || dow === 6;

      const oldDay = roster.days[oldKey];
      days[newKey] = {
        ...oldDay,
        date: newKey,
        formattedDate,
        dayNumber: dayNum,
        dayName,
        isWeekend,
        seyrantepeStaff: (oldDay.seyrantepeStaff || []).map((s: any) => ({
          ...s,
          id: String(s.id).replace(/sey-[^-]+-[^-]+-/, `sey-${newKey}-`)
        })),
        cayirbasiStaff: (oldDay.cayirbasiStaff || []).map((s: any) => ({
          ...s,
          id: String(s.id).replace(/sar-[^-]+-[^-]+-/, `sar-${newKey}-`)
        }))
      };
    });
  } else {
    for (const dateKey of Object.keys(roster.days)) {
      const day = { ...roster.days[dateKey] };
      if (day && day.date) {
        const parts = String(day.date).split('-');
        if (parts.length === 3) {
          const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), 12, 0, 0);
          const dow = d.getDay();
          day.dayName = turkishDays[dow];
          day.isWeekend = dow === 0 || dow === 6;
        }
      }
      days[dateKey] = day;
    }
  }

  return { ...roster, days };
}

// Read rosters from JSON file
function readRosters(): Record<string, any> {
  try {
    if (fs.existsSync(ROSTERS_FILE)) {
      const raw = fs.readFileSync(ROSTERS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        for (const k of Object.keys(parsed)) {
          parsed[k] = sanitizeRoster(parsed[k]);
        }
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading rosters from file:', err);
  }
  return {};
}

// Write rosters to JSON file
function saveRosters(rosters: Record<string, any>): boolean {
  try {
    fs.writeFileSync(ROSTERS_FILE, JSON.stringify(rosters, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving rosters to file:', err);
    return false;
  }
}

// API Routes
app.get('/api/roster', (req, res) => {
  const rosters = readRosters();
  res.json({
    success: true,
    rosters,
    monthKeys: Object.keys(rosters).sort()
  });
});

app.post('/api/roster', (req, res) => {
  try {
    const payload = req.body;
    if (!payload) {
      return res.status(400).json({ success: false, error: 'Geçersiz nöbet takvimi verisi' });
    }

    // Support batch syncing if payload contains rosters object
    if (payload.rosters && typeof payload.rosters === 'object') {
      const rosters = readRosters();
      for (const key of Object.keys(payload.rosters)) {
        const item = payload.rosters[key];
        if (item && item.monthKey && item.days) {
          rosters[key] = sanitizeRoster(item);
        }
      }
      const saved = saveRosters(rosters);
      if (!saved) {
        return res.status(500).json({ success: false, error: 'Sunucuya kayıt yazılamadı' });
      }
      return res.json({
        success: true,
        monthKeys: Object.keys(rosters).sort(),
        rosters
      });
    }

    const roster = payload;
    if (!roster || !roster.monthKey || !roster.days) {
      return res.status(400).json({ success: false, error: 'Geçersiz nöbet takvimi verisi' });
    }

    const sanitized = sanitizeRoster(roster);
    const rosters = readRosters();
    rosters[sanitized.monthKey] = sanitized;
    const saved = saveRosters(rosters);

    if (!saved) {
      return res.status(500).json({ success: false, error: 'Sunucuya kayıt yazılamadı' });
    }

    console.log(`[Roster API] Successfully saved month ${sanitized.monthKey} to server data.`);

    res.json({
      success: true,
      monthKey: roster.monthKey,
      monthKeys: Object.keys(rosters).sort(),
      roster: sanitized
    });
  } catch (err: any) {
    console.error('[Roster API Error]', err);
    res.status(500).json({ success: false, error: err?.message || 'Bilinmeyen hata' });
  }
});

app.post('/api/roster/sync', (req, res) => {
  try {
    const payload = req.body;
    if (!payload || !payload.rosters || typeof payload.rosters !== 'object') {
      return res.status(400).json({ success: false, error: 'Eşitleme için geçerli rosters nesnesi gereklidir.' });
    }

    const rosters = readRosters();
    let syncedCount = 0;

    for (const key of Object.keys(payload.rosters)) {
      const item = payload.rosters[key];
      if (item && item.monthKey && item.days && Object.keys(item.days).length > 0) {
        rosters[key] = sanitizeRoster(item);
        syncedCount++;
      }
    }

    const saved = saveRosters(rosters);
    if (!saved) {
      return res.status(500).json({ success: false, error: 'Sunucuya kayıt yazılamadı' });
    }

    console.log(`[Roster Sync] Successfully synced ${syncedCount} rosters from client.`);

    res.json({
      success: true,
      syncedCount,
      monthKeys: Object.keys(rosters).sort(),
      rosters
    });
  } catch (err: any) {
    console.error('[Roster Sync Error]', err);
    res.status(500).json({ success: false, error: err?.message || 'Eşitleme sırasında hata oluştu' });
  }
});

app.delete('/api/roster/:monthKey', (req, res) => {
  try {
    const { monthKey } = req.params;
    const rosters = readRosters();
    if (rosters[monthKey]) {
      delete rosters[monthKey];
      saveRosters(rosters);
    }
    res.json({
      success: true,
      monthKeys: Object.keys(rosters).sort()
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message || 'Silinemedi' });
  }
});

// Weekly Schedule API
function readWeeklySchedule(): any | null {
  try {
    if (!fs.existsSync(SCHEDULE_FILE)) return null;
    const content = fs.readFileSync(SCHEDULE_FILE, 'utf-8');
    const parsed = JSON.parse(content);
    if (!parsed) return null;
    if (parsed.schedules && typeof parsed.schedules === 'object') {
      return parsed;
    }
    // Backward compatibility: If it's a single week object
    if (parsed.weekKey && Array.isArray(parsed.days)) {
      return {
        activeWeekKey: parsed.weekKey,
        schedules: {
          [parsed.weekKey]: parsed
        }
      };
    }
    return parsed;
  } catch (err) {
    console.error('Error reading weekly schedule:', err);
    return null;
  }
}

function saveWeeklySchedule(data: any): boolean {
  try {
    fs.writeFileSync(SCHEDULE_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving weekly schedule:', err);
    return false;
  }
}

app.get('/api/schedule', (req, res) => {
  const data = readWeeklySchedule();
  res.json(data || null);
});

app.post('/api/schedule', (req, res) => {
  try {
    const payload = req.body;
    if (!payload) {
      return res.status(400).json({ success: false, error: 'Geçersiz veri' });
    }

    let existing = readWeeklySchedule() || { activeWeekKey: '2026-W45', schedules: {} };
    if (!existing.schedules) existing.schedules = {};

    if (payload.schedules && typeof payload.schedules === 'object') {
      existing.schedules = { ...existing.schedules, ...payload.schedules };
      if (payload.activeWeekKey) {
        existing.activeWeekKey = payload.activeWeekKey;
      }
    } else if (payload.weekKey && Array.isArray(payload.days)) {
      existing.schedules[payload.weekKey] = payload;
      existing.activeWeekKey = payload.weekKey;
    } else {
      return res.status(400).json({ success: false, error: 'Geçersiz haftalık program verisi' });
    }

    const saved = saveWeeklySchedule(existing);
    if (!saved) {
      return res.status(500).json({ success: false, error: 'Sunucuya haftalık program kaydedilemedi' });
    }
    res.json({ success: true, ...existing });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message || 'Bilinmeyen hata' });
  }
});

// PDF Schedule Parsing Helper Functions
function getISOWeekNumber(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

const TURKISH_MONTH_MAP: Record<string, number> = {
  'OCAK': 1, 'ŞUBAT': 2, 'SUBAT': 2, 'MART': 3, 'NİSAN': 4, 'NISAN': 4,
  'MAYIS': 5, 'HAZİRAN': 6, 'HAZIRAN': 6, 'TEMMUZ': 7, 'AĞUSTOS': 8, 'AGUSTOS': 8,
  'EYLÜL': 9, 'EYLUL': 9, 'EKİM': 10, 'EKIM': 10, 'KASIM': 11, 'ARALIK': 12
};

const TURKISH_MONTH_NAMES_ARR = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

const STANDARD_UNITS: Array<{ unitId: string; unitName: string; category: any; isPostOp?: any }> = [
  { unitId: 'genel-cerrahi', unitName: 'GENEL CERRAHİ', category: 'ameliyathane' },
  { unitId: 'nrs', unitName: 'NRŞ (BEYİN CERRAHİSİ)', category: 'ameliyathane' },
  { unitId: 'ortopedi-acil', unitName: 'ORTOPEDİ - ACİL', category: 'ameliyathane' },
  { unitId: 'kbb', unitName: 'KBB', category: 'ameliyathane' },
  { unitId: 'plastik-cerrahi', unitName: 'PLASTİK CERRAHİ', category: 'ameliyathane' },
  { unitId: 'uroloji', unitName: 'ÜROLOJİ', category: 'ameliyathane' },
  { unitId: 'arka-kbb-goz', unitName: 'ARKA KBB + GÖZ', category: 'ameliyathane' },
  { unitId: 'gogus-cerrahisi', unitName: 'GÖĞÜS CERRAHİSİ / MR-GÖĞÜS', category: 'ameliyathane' },
  { unitId: 'cocuk-cerrahisi', unitName: 'ÇOCUK CERRAHİSİ', category: 'ameliyathane' },
  { unitId: 'dogumhane', unitName: 'DOĞUMHANE (C/S)', category: 'ameliyathane' },
  { unitId: 'kadin-dogum', unitName: 'KADIN DOĞUM', category: 'ameliyathane' },
  { unitId: 'dis-anestezi', unitName: 'DIŞ ANESTEZİ / ENDOSKOPİ', category: 'ameliyathane' },
  { unitId: 'poliklinik', unitName: 'ANESTEZİ POLİKLİNİĞİ', category: 'poliklinik' },
  { unitId: 'sariyer-ybu', unitName: 'SARIYER YBÜ', category: 'yogun_bakim' },
  { unitId: 'sariyer-1-ybu', unitName: 'SARIYER -1 YBÜ (SARIYER POST-OP)', category: 'yogun_bakim', isPostOp: 'sariyer' },
  { unitId: 'sariyer-2-ybu', unitName: 'SARIYER -2 YBÜ', category: 'yogun_bakim' },
  { unitId: 'sariyer-pol', unitName: 'SARIYER ANESTEZİ POLİKLİNİK', category: 'poliklinik' },
  { unitId: 'nobet-ertesi', unitName: 'NÖBET ERTESİ', category: 'diger' },
  { unitId: 'izin', unitName: 'İZİNLİ HEKİMLER', category: 'diger' },
  { unitId: 'rotasyoner', unitName: 'ROTASYONER ASİSTANLAR', category: 'diger' }
];

app.post('/api/parse-schedule-pdf', async (req, res) => {
  try {
    const { pdfBase64, fileName } = req.body;
    if (!pdfBase64) {
      return res.status(400).json({ success: false, error: 'PDF verisi bulunamadı' });
    }

    const cleanBase64 = String(pdfBase64).replace(/^data:application\/pdf;base64,/, '');
    const buffer = Buffer.from(cleanBase64, 'base64');
    const parser = new PDFParse({ data: buffer });
    const parsedTextResult = await parser.getText();
    const fullText = (parsedTextResult?.text || '').trim();
    const upperText = fullText.toUpperCase();
    const upperFileName = String(fileName || '').toUpperCase();

    // 1. Detect Week Range & Month & Year
    let startDay = 2;
    let endDay = 6;
    let month = 11;
    let year = 2026;

    // Try finding date range in text or file name: e.g. "02 - 06 KASIM 2026" or "26 - 30 EKİM 2026"
    const textRangeMatch = (upperText + ' ' + upperFileName).match(/(\d{1,2})\s*[-–—/]\s*(\d{1,2})\s+([A-ZÇĞİÖŞÜ]+)\s*(\d{4})?/);
    if (textRangeMatch) {
      startDay = parseInt(textRangeMatch[1], 10);
      endDay = parseInt(textRangeMatch[2], 10);
      const monthStr = textRangeMatch[3];
      if (TURKISH_MONTH_MAP[monthStr]) {
        month = TURKISH_MONTH_MAP[monthStr];
      }
      if (textRangeMatch[4]) {
        year = parseInt(textRangeMatch[4], 10);
      }
    } else {
      // Check for DD.MM.YYYY - DD.MM.YYYY
      const dotMatch = (upperText + ' ' + upperFileName).match(/(\d{1,2})\.(\d{1,2})\.(\d{2,4})\s*[-–—/]\s*(\d{1,2})\.(\d{1,2})\.(\d{2,4})/);
      if (dotMatch) {
        startDay = parseInt(dotMatch[1], 10);
        month = parseInt(dotMatch[2], 10);
        let y = parseInt(dotMatch[3], 10);
        if (y < 100) y += 2000;
        year = y;
        endDay = parseInt(dotMatch[4], 10);
      }
    }

    // Generate Monday-Friday WorkDayInfo objects
    const days: any[] = [];
    const dayNames = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];
    const mondayDate = new Date(year, month - 1, startDay, 12, 0, 0);

    for (let i = 0; i < 5; i++) {
      const curDate = new Date(year, month - 1, startDay + i, 12, 0, 0);
      const cYear = curDate.getFullYear();
      const cMonth = curDate.getMonth() + 1;
      const cDay = curDate.getDate();
      const dateKey = `${cYear}-${String(cMonth).padStart(2, '0')}-${String(cDay).padStart(2, '0')}`;
      const dateFormatted = `${String(cDay).padStart(2, '0')}.${String(cMonth).padStart(2, '0')}.${cYear}`;

      const isHoliday = (cMonth === 10 && cDay === 29) || (cMonth === 1 && cDay === 1) || (cMonth === 4 && cDay === 23) || (cMonth === 5 && cDay === 1) || (cMonth === 5 && cDay === 19);
      const holidayNote = (cMonth === 10 && cDay === 29) ? '29 Ekim Cumhuriyet Bayramı' : undefined;

      days.push({
        dateKey,
        dateFormatted,
        dayName: dayNames[i],
        isHoliday,
        holidayNote
      });
    }

    const weekNum = getISOWeekNumber(mondayDate);
    const weekKey = `${year}-W${String(weekNum).padStart(2, '0')}`;
    const turkishMonthName = TURKISH_MONTH_NAMES_ARR[month - 1] || 'Kasım';
    const title = `${String(startDay).padStart(2, '0')} - ${String(endDay).padStart(2, '0')} ${turkishMonthName} ${year} Haftalık Mesai Programı`;
    const dateRangeText = `${days[0].dateFormatted} - ${days[4].dateFormatted}`;

    // 2. Extract unit assignments
    const rows: any[] = [];

    // Helper: extract doctor names following a unit pattern in the text
    const lines = fullText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

    for (const stdUnit of STANDARD_UNITS) {
      const assignments: Record<string, string[]> = {};
      days.forEach(d => {
        assignments[d.dateKey] = [];
      });

      // Scan lines for this unit name
      const searchNeedle = stdUnit.unitName.split(' ')[0].toUpperCase();
      let foundLineIdx = lines.findIndex(l => l.toUpperCase().includes(searchNeedle));

      if (foundLineIdx !== -1) {
        // Collect tokens from the line and subsequent 2 lines
        const contextText = lines.slice(foundLineIdx, foundLineIdx + 3).join(' ');
        // Extract words resembling doctor names (all caps, 3-20 chars)
        const doctorTokens = contextText
          .replace(new RegExp(searchNeedle, 'gi'), '')
          .split(/[,/;|\t\n]+/)
          .map(t => t.trim().toUpperCase())
          .filter(t => t.length >= 3 && !/PAZARTESİ|SALI|ÇARŞAMBA|PERŞEMBE|CUMA|HAFTALIK|PROGRAM|AMELİYATHANE|SARIYER|SEYRANTEPE|TARİH/.test(t));

        if (doctorTokens.length > 0) {
          // Distribute across days
          days.forEach((d, idx) => {
            const doc = doctorTokens[idx % doctorTokens.length];
            if (doc && !assignments[d.dateKey].includes(doc)) {
              assignments[d.dateKey].push(doc);
            }
          });
        }
      }

      rows.push({
        unitId: stdUnit.unitId,
        unitName: stdUnit.unitName,
        category: stdUnit.category,
        isPostOp: stdUnit.isPostOp,
        assignments
      });
    }

    const schedule = {
      weekKey,
      title,
      dateRangeText,
      days,
      rows,
      updatedAt: new Date().toISOString(),
      pdfUrl: `data:application/pdf;base64,${cleanBase64}`,
      pdfFileName: fileName || 'haftalik_program.pdf'
    };

    res.json({
      success: true,
      schedule,
      detectedWeek: weekKey,
      detectedTitle: title
    });
  } catch (err: any) {
    console.error('[PDF Parse Error]', err);
    res.status(500).json({ success: false, error: err?.message || 'PDF analiz edilirken hata oluştu' });
  }
});

// Setup server with Vite in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Clinic Assistant server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
