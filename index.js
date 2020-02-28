const core = require('@actions/core');
const exec = require('@actions/exec');
const io = require('@actions/io');
const os = require('os');
const quote = require('quote');

const is_windows = () => os.platform() === 'win32';
const is_linux = () => os.platform() === 'linux';

async function run() {
  const path = core.getInput('path');
  await io.mkdirP(path);
  if (is_linux()) {
    await exec.exec("sudo", ['apt-get', 'install', 'python3-venv']);
    await exec.exec('python3', ['-m', 'venv', quote(path)]);
  } else if(is_windows()) {
    await exec.exec('python3', ['-m', 'venv', quote(path)]);
  } else {
    await exec.exec('pyenv', [quote(path)]);
  }
}

run().then(
  (resolve) => {},
  (error) => {core.setFailed(error.message); });
