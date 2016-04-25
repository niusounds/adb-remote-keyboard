'use strict';

$(window).on('keydown', e => {
  if (e.keyCode === 13 && e.ctrlKey) {
    let elem = $('#txt');
    let text = elem.val();
    submitText(text);
    elem.val('');
  }
});

function submitText(text) {
  if (typeof require === 'undefined') return;

  const spawn = require('child_process').spawn;
  const adb = spawn('adb', ['shell', 'input', 'text', text]);

  adb.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  adb.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  adb.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}