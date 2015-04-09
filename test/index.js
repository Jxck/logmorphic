global.consolelog = console.log.bind(console);

consolelog('1..15');

var count = 1;
function assert(act, exp, msg) {
  consolelog('ok', count++);
  console.assert(act === exp, msg || 'act: ' + act + '\n' + 'exp: ' + exp);
}

global.assert = assert;

require('./test.js');
require('./filename.js');
