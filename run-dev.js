import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

console.log('------------------------------------------------------------');
console.log('🚀 Starting Jahid Office Equipment (JOE) MERN Stack Dev Mode');
console.log('   - Server API: http://localhost:5000');
console.log('   - Client App: http://localhost:3000');
console.log('------------------------------------------------------------\n');

// 1. Start Server
const serverProcess = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'pipe',
  shell: true
});

serverProcess.stdout.on('data', (data) => {
  process.stdout.write(`[SERVER] ${data}`);
});

serverProcess.stderr.on('data', (data) => {
  process.stderr.write(`[SERVER ERR] ${data}`);
});

// 2. Start Client
const clientProcess = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'client'),
  stdio: 'pipe',
  shell: true
});

clientProcess.stdout.on('data', (data) => {
  process.stdout.write(`[CLIENT] ${data}`);
});

clientProcess.stderr.on('data', (data) => {
  process.stderr.write(`[CLIENT ERR] ${data}`);
});

// Handle termination signals
const cleanup = () => {
  console.log('\nShutting down dev processes...');
  serverProcess.kill();
  clientProcess.kill();
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
