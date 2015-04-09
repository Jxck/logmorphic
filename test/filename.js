var Logger = Logger || require('../').Logger;

var assert = global.assert;


var consolelog = global.consolelog;

var trace = console.trace;
var debug = console.debug;
var info = console.info;
var warn = console.warn;
var error = console.error;
var fatal = console.fatal;

console.fatal = function(log) {
  assert(log, 'filename.js:45');
};

console.error = function(log) {
  assert(log, 'filename.js:48');
};

console.warn = function(log) {
  assert(log, 'filename.js:51');
};

console.info = function(log) {
  assert(log, 'filename.js:57');
};

console.debug = function(log) {
  assert(log, 'filename.js:64');
};

console.trace = function(log) {
  assert(log, 'filename.js:68');
};

console.log('# test_filename');
var logger = new Logger('test_filename', {
  format: '%file'
});


logger.fatal();

function outer() {
  logger.error();

  function inner() {
    logger.warn();
  }
  inner();
}

function base() {
  logger.info();
  outer();
}

base();

setTimeout(function() {
  logger.debug();
}, 10);

for (var i=0; i<1; i++) {
  logger.trace();
}

console.trace = trace;
console.debug = debug;
console.info = info;
console.warn = warn;
console.error = error;
console.fatal = fatal;
