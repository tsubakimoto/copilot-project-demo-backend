# copilot-project-demo-backend

Demo backend API implemented with Node.js and Express.

## Run

Requires Node.js 18 or later.

```powershell
npm install
npm start
```

The API listens on `http://localhost:3000` by default. Set `PORT` to use a different port and `CORS_ORIGIN` to change the allowed browser origin. The default allowed origin is `http://localhost:5173`.

## Endpoints

- `GET /api/time` returns `{ "now": "<ISO-8601 timestamp>" }`.
- `GET /api/greet` returns `{ "message": "Hello!" }`.
- `GET /api/os` returns the server's `platform`, `architecture`, and `release`.
