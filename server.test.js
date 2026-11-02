const assert = require('node:assert/strict');
const os = require('node:os');
const { after, before, describe, it } = require('node:test');
const app = require('./server');

const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

describe('demo API', () => {
  it('returns the current time as an ISO-8601 timestamp', async () => {
    const response = await fetch(`${baseUrl}/api/time`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(typeof body.now, 'string');
    assert.equal(new Date(body.now).toISOString(), body.now);
  });

  it('returns a greeting message', async () => {
    const response = await fetch(`${baseUrl}/api/greet`);

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { message: 'Hello!' });
  });

  it('returns server OS information without a hostname', async () => {
    const response = await fetch(`${baseUrl}/api/os`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body, {
      platform: os.platform(),
      architecture: os.arch(),
      release: os.release(),
    });
  });

  it('allows the configured frontend origin', async () => {
    const response = await fetch(`${baseUrl}/api/greet`, {
      headers: { Origin: allowedOrigin },
    });

    assert.equal(response.headers.get('access-control-allow-origin'), allowedOrigin);
  });
});
