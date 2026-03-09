/**
 * Shared back-end API for the website (web/) and mobile app (mobile/).
 * Add database and auth when ready.
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'backend' });
});

// Placeholder: list classes (replace with DB when ready)
app.get('/api/classes', (req, res) => {
  res.json({
    classes: [
      { code: 'MCH 4951', name: 'MCH 4951' },
      { code: 'MCH 4952', name: 'MCH 4952' }
    ]
  });
});

// Placeholder: get students for a class (replace with DB when ready)
app.get('/api/classes/:code/students', (req, res) => {
  const { code } = req.params;
  // TODO: load from database; for now return empty array
  res.json({ classCode: code, students: [] });
});

app.listen(PORT, () => {
  console.log(`Backend API listening on http://localhost:${PORT}`);
});
