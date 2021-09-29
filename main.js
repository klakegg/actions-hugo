'use strict';

const { spawn } = require('child_process');
const core = require('@actions/core');

function docker(cmd) {
  const docker = spawn('docker', cmd);

  docker.stdout.on('data', data => {
    process.stdout.write(data);
  });
  docker.stderr.on('data', data => {
    process.stdout.write(data);
  });
  docker.on('close', code => {
    if (code != 0)
      core.setFailed(`Action failed with error ${code}`);
  });
}

// Generate label
const label = (core.getInput('version') == '' ? '' : `${core.getInput('version')}-`) + core.getInput('image');
console.log(`Using klakegg/hugo:${label}`);

// Prepare command
const command = core.getInput('command') == '' ? [] :
core.getInput('command').split(' ');

// Pull image
docker(['pull', `klakegg/hugo:${label}`]);

// Run build
docker(['run', '--rm' , '-i',
  '-v', `${process.env.GITHUB_WORKSPACE}/${core.getInput('source')}:/src`,
  '-v', `${process.env.GITHUB_WORKSPACE}/${core.getInput('target')}:/target`,
  '-v', `${process.env.GITHUB_WORKSPACE}/${core.getInput('cache')}:/tmp/hugo_cache`,
  '-e', `HUGO_ENV=${core.getInput('env')}`,
  '-e', `HUGO_PANDOC=${core.getInput('pandoc_command')}`,
  `klakegg/hugo:${label}`]
  .concat(command));
