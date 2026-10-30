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

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (e) {
    console.error('Could not create data dir:', e);
  }
}

// Read rosters from JSON file
function readRosters(): Record<string, any> {
  try {
    if (fs.existsSync(ROSTERS_FILE)) {
      const raw = fs.readFileSync(ROSTERS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
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

    const rosters = readRosters();
    rosters[roster.monthKey] = roster;
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
