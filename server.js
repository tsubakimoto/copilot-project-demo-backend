const express = require('express');
const cors = require('cors');
const os = require('node:os');

const app = express();
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: allowedOrigin }));

app.get('/api/time', (_request, response) => {
  response.json({ now: new Date().toISOString() });
});

app.get('/api/greet', (_request, response) => {
  response.json({ message: 'Hello!' });
});

app.get('/api/os', (_request, response) => {
  response.json({
    platform: os.platform(),
    architecture: os.arch(),
    release: os.release(),
  });
});

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`Demo API listening on port ${port}`);
  });
}

module.exports = app;
