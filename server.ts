import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
    const roster = req.body;
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

    res.json({
      success: true,
      monthKey: roster.monthKey,
      monthKeys: Object.keys(rosters).sort(),
      roster
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message || 'Bilinmeyen hata' });
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
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading weekly schedule:', err);
    return null;
  }
}

function saveWeeklySchedule(schedule: any): boolean {
  try {
    fs.writeFileSync(SCHEDULE_FILE, JSON.stringify(schedule, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving weekly schedule:', err);
    return false;
  }
}

app.get('/api/schedule', (req, res) => {
  const schedule = readWeeklySchedule();
  res.json(schedule || null);
});

app.post('/api/schedule', (req, res) => {
  try {
    const schedule = req.body;
    if (!schedule || !Array.isArray(schedule.days) || !Array.isArray(schedule.rows)) {
      return res.status(400).json({ success: false, error: 'Geçersiz haftalık program verisi' });
    }
    const saved = saveWeeklySchedule(schedule);
    if (!saved) {
      return res.status(500).json({ success: false, error: 'Sunucuya haftalık program kaydedilemedi' });
    }
    res.json({ success: true, schedule });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message || 'Bilinmeyen hata' });
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
