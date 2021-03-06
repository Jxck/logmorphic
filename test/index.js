/**
 * Prepare for test
 */
var consolelog = console.log.bind(console);

var N = 15;
if (typeof localStorage !== 'undefined') N = 18;
consolelog('1..', N);

var count = 1;
function assert(act, exp, msg) {
  console.assert(act === exp, msg || 'act: ' + act + '\n' + 'exp: ' + exp);
  consolelog('ok', count++);
}

var Logger = Logger || require('../').Logger;

/**
 * test logging
 */
var trace = console.trace;
var debug = console.debug;
var info = console.info;
var warn = console.warn;
var error = console.error;
var fatal = console.fatal;

var _date = Logger.prototype._date;
var _file = Logger.prototype._file;

(function test_default() {
  consolelog('# test_default');

  // dummy date
  Logger.prototype._date = function() {
    return '2000/01/01';
  };

  // dummy file
  Logger.prototype._file = function() {
    return 'default.js:10:10';
  };

  console.trace = function(log) {
    assert(log, '2000/01/01 [TRACE] default [default.js:10:10] - the value of "hoge" at {"hoge":100} is 100');
  };

  console.debug = function(log) {
    assert(log, '2000/01/01 [DEBUG] default [default.js:10:10] - the value of "hoge" at {"hoge":100} is 100');
  };

  console.info = function(log) {
    assert(log, '2000/01/01 [INFO] default [default.js:10:10] - the value of "hoge" at {"hoge":100} is 100');
  };

  console.warn = function(log) {
    assert(log, '2000/01/01 [WARN] default [default.js:10:10] - the value of "hoge" at {"hoge":100} is 100');
  };

  console.error = function(log) {
    assert(log, '2000/01/01 [ERROR] default [default.js:10:10] - the value of "hoge" at {"hoge":100} is 100');
  };

  console.fatal = function(log) {
    assert(log, '2000/01/01 [FATAL] default [default.js:10:10] - the value of "hoge" at {"hoge":100} is 100');
  };

  var logger = Logger.getLogger('default');
  var a = { hoge: 100 };
  logger.trace('the value of "hoge" at', a, 'is', 100);
  logger.debug('the value of "hoge" at', a, 'is', 100);
  logger.info('the value of "hoge" at', a, 'is', 100);
  logger.warn('the value of "hoge" at', a, 'is', 100);
  logger.error('the value of "hoge" at', a, 'is', 100);
  logger.fatal('the value of "hoge" at', a, 'is', 100);
})();

(function test_option_format() {
  consolelog('# test_option_format');

  // dummy date
  Logger.prototype._date = function() {
    return '2000/02/02';
  };

  // dummy file
  Logger.prototype._file = function() {
    return 'format.js:10:10';
  };

  console.fatal = function(log) {
    assert(log, '[2000/02/02] format FATAL (format.js:10:10) - custom format');
  };

  var format = '[%date] %category %level (%file) - %message';
  var logger = Logger.getLogger('format', { format: format });

  logger.fatal('custom format');
})();

(function test_option_loglevel() {
  consolelog('# test_option_format');

  // dummy date
  Logger.prototype._date = function() {
    return '2000/03/03';
  };

  // dummy file
  Logger.prototype._file = function() {
    return 'loglevel.js:10:10';
  };

  console.trace = function(log) {
    throw new Error('cant be here');
  };

  console.debug = function(log) {
    throw new Error('cant be here');
  };

  console.info = function(log) {
    throw new Error('cant be here');
  };

  console.warn = function(log) {
    throw new Error('cant be here');
  };

  console.error = function(log) {
    assert(log, '2000/03/03 [ERROR] loglevel [loglevel.js:10:10] - called');
  };

  console.fatal = function(log) {
    assert(log, '2000/03/03 [FATAL] loglevel [loglevel.js:10:10] - called');
  };

  var logger = Logger.getLogger('loglevel', {
    loglevel: 'ERROR',
  });

  logger.trace('never called');
  logger.debug('never called');
  logger.info('never called');
  logger.warn('never called');
  logger.error('called');
  logger.fatal('called');
})();

(function test_localstorage() {
  if (typeof window === 'undefined') return;
  consolelog('# test_local_storage');

  console.debug = debug;

  var key = 'test';
  localStorage.removeItem(key);

  var logger = Logger.getLogger('APP', {
    loglevel: 'FATAL',
    format:   '%message',
    storage:  {
      type:  'localStorage',
      key:   key,
      limit: 21,
    },
  });

  var message = 'tenbytes!!';
  logger.debug(message);

  setTimeout(function() {
    assert(localStorage.getItem(key), message, '10byte');

    logger.debug(message);

    setTimeout(function() {
      assert(localStorage.getItem(key), message + '\n' + message, '20byte');


      logger.debug(message);

      setTimeout(function() {
        assert(localStorage.getItem(key), message + '\n' + message, '20byte(limit)');
      }, 10);
    }, 10);
  }, 10);
})();

console.trace = trace;
console.debug = debug;
console.info = info;
console.warn = warn;
console.error = error;
console.fatal = fatal;

Logger.prototype._date = _date;
Logger.prototype._file = _file;


/**
 * Test file name
 */
var trace = console.trace;
var debug = console.debug;
var info = console.info;
var warn = console.warn;
var error = console.error;
var fatal = console.fatal;

console.fatal = function(log) {
  assert(log, 'index.js:241');
};

console.error = function(log) {
  assert(log, 'index.js:244');
};

console.warn = function(log) {
  assert(log, 'index.js:247');
};

console.info = function(log) {
  assert(log, 'index.js:253');
};

console.debug = function(log) {
  assert(log, 'index.js:260');
};

console.trace = function(log) {
  assert(log, 'index.js:264');
};

console.log('# test_filename');
var logger = new Logger('test_filename', {
  format: '%file',
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

for (var i = 0; i < 1; i++) {
  logger.trace();
}

console.trace = trace;
console.debug = debug;
console.info = info;
console.warn = warn;
console.error = error;
console.fatal = fatal;
