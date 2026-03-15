import express from 'express';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import ExcelJS from 'exceljs';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3001;

const TELEGRAM_BOT_TOKEN = "8702795049:AAEEtJmZvRjJbyNsS6ijJwQd_O7Z5wAOMhU";
const TELEGRAM_CHAT_ID = "6155944381";

app.use(express.json());

// ================= DATABASE =================

const db = new Database('contacts.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    budget TEXT NOT NULL,
    businessType TEXT NOT NULL,
    goals TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// ================= TELEGRAM FUNCTION =================

async function sendTelegramMessage(text) {

  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text
    })
  });

}

async function saveToExcel(data) {

  const filePath = './leads.xlsx';

  const workbook = new ExcelJS.Workbook();

  let worksheet;

  if (fs.existsSync(filePath)) {

    await workbook.xlsx.readFile(filePath);
    worksheet = workbook.getWorksheet('Leads');

  } else {

    worksheet = workbook.addWorksheet('Leads');

    worksheet.columns = [
      { header: 'Name', key: 'name', width: 25 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Budget', key: 'budget', width: 20 },
      { header: 'Business Type', key: 'businessType', width: 20 },
      { header: 'Goals', key: 'goals', width: 40 },
      { header: 'Date', key: 'date', width: 20 }
    ];

  }

  worksheet.addRow({
    ...data,
    date: new Date().toLocaleString()
  });

  await workbook.xlsx.writeFile(filePath);

}

// ================= CONTACT API =================await sendTelegramMessage(message);


app.post('/api/contact', async (req, res) => {
  try {

    const { name, email, budget, businessType, goals } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and Email are required' });
    }

    const insert = db.prepare(`
      INSERT INTO contacts (name, email, budget, businessType, goals)
      VALUES (?, ?, ?, ?, ?)
    `);

    const info = insert.run(name, email, budget, businessType, goals);

    // TELEGRAM MESSAGE
    const message = `
🔥 NEW TIKTOK ADS LEAD

    Name: ${name}
    Email: ${email}
    Budget: ${budget}
    Business: ${businessType}
    Goals: ${goals}
`;

    await sendTelegramMessage(message);
    await saveToExcel({
      name,
      email,
      budget,
      businessType,
      goals
    });
    res.status(201).json({
      success: true,
      id: info.lastInsertRowid
    });

  } catch (err) {

    console.error('Error saving contact:', err);

    res.status(500).json({
      error: 'Internal server error'
    });

  }
});

// ================= HEALTH CHECK =================

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ================= SERVER =================

async function startServer() {

  const isProduction = process.env.NODE_ENV === 'production';
  const root = process.cwd();

  if (isProduction) {

    app.use(express.static(`${root}/dist/client`));

  } else {

    const vite = await import('vite');

    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true }
      })
    ).middlewares;

    app.use(viteDevMiddleware);

  }

  // Vike middleware

  app.get('*', async (req, res, next) => {

    try {

      if (req.originalUrl.startsWith('/api')) {
        return next();
      }

      const { renderPage } = await import('vike/server');

      const pageContextInit = {
        urlOriginal: req.originalUrl
      };

      const pageContext = await renderPage(pageContextInit);

      if (pageContext.httpResponse) {

        const { body, statusCode, headers } = pageContext.httpResponse;

        headers.forEach(([name, value]) =>
          res.setHeader(name, value)
        );

        res.status(statusCode).send(body);

      } else {
        next();
      }

    } catch (e) {

      console.error(e);
      next(e);

    }

  });

  app.listen(port, '0.0.0.0', () => {

    console.log(`Server running at http://localhost:${port}`);
    console.log(`Network access enabled at http://192.168.1.6:${port}`);

  });

}


startServer();
