const path = require('path');
const fs = require('fs');

// The standalone server is built here when output: "standalone" is used in next.config.mjs
const standaloneServerPath = path.join(__dirname, '.next', 'standalone', 'server.js');

if (fs.existsSync(standaloneServerPath)) {
  // If the standalone server exists, run it
  console.log('Starting Next.js standalone server...');
  require(standaloneServerPath);
} else {
  // Fallback to default start if standalone is missing (e.g. deployed without standalone output or local dev)
  console.log('Standalone server not found. Falling back to next start...');
  const { execSync } = require('child_process');
  
  try {
    execSync('npx next start', { stdio: 'inherit' });
  } catch (err) {
    console.error('Failed to start next server:', err);
    process.exit(1);
  }
}
