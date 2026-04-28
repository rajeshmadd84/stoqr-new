const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Force production mode. Azure App Service does not always set NODE_ENV=production by default,
// which causes Next.js to start in development mode, consume too much memory, and crash (503).
const dev = false;
const hostname = '0.0.0.0';
// Azure uses process.env.PORT (e.g., '8080'). Ensure it's an integer.
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
