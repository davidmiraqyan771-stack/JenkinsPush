'use strict';

const express = require('express');
const path = require('path');

const app = express();

// Elastic Beanstalk sets PORT env variable (default 8080)
const PORT = process.env.PORT || 8080;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ── Routes ────────────────────────────────────────────────────────────────────

// Root — serve the front page (static middleware handles index.html automatically)
// The JSON status endpoint is kept at /api/status for programmatic access
app.get('/api/status', (req, res) => {
  res.json({
    status: 'okddddadadddasdasdddddbdadadd',
    message: '🚀 Node.js app is running on Elastic Beanstalk! (Updated)',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// A simple /health route (good practice for custom health-check config)
app.get('/health', (req, res) => {
  res.status(200).json({ healthy: true, uptime: process.uptime() });
});

// Example API route
app.get('/api/info', (req, res) => {
  res.json({
    node: process.version,
    platform: process.platform,
    memoryUsage: process.memoryUsage(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.originalUrl });
});

// Error handler
app.use((err, req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app; // export for testing
