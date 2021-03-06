[![Build Status](https://travis-ci.org/Jxck/logmorphic.svg?branch=master)](https://travis-ci.org/Jxck/logmorphic)
[![Testling](https://ci.testling.com/Jxck/logmorphic.png)](https://ci.testling.com/Jxck/logmorphic)

# logmorphic

isomorphic logger.
you can also save to localStorage.

## API

```js
// `<script src='node_modules/logmorphic/index.js></script>` in browser
// or
// `npm install logmorphic` in node

var Logger = Logger || require('logmorphic').Logger;

var format = '[%date] %category %level (%file) - %message';
var appLogger = Logger.getLogger('APP', {
  loglevel: 'DEBUG',
  format: format,
  storage: {
    type: 'localStorage',
    key: 'log',
    limit: 1000 * 10 // 10K
  }
});

var a = { hoge: 100 };
appLogger.trace('the value of "hoge" at', a, 'is', 100);
appLogger.debug('the value of "hoge" at', a, 'is', 100);
appLogger.info('the value of "hoge" at', a, 'is', 100);
appLogger.warn('the value of "hoge" at', a, 'is', 100);
appLogger.error('the value of "hoge" at', a, 'is', 100);
appLogger.fatal('the value of "hoge" at', a, 'is', 100);
```

output (no `TRACE` because of `loglevel` settings to `DEBUG`)

```sh
$ node sample/sample.js
[2015-03-06T07:11:00.036Z] APP DEBUG (sample.js:16) - the value of "hoge" at {"hoge":100} is 100
[2015-03-06T07:11:00.038Z] APP INFO (sample.js:17) - the value of "hoge" at {"hoge":100} is 100
[2015-03-06T07:11:00.039Z] APP WARN (sample.js:18) - the value of "hoge" at {"hoge":100} is 100
[2015-03-06T07:11:00.039Z] APP ERROR (sample.js:19) - the value of "hoge" at {"hoge":100} is 100
[2015-03-06T07:11:00.040Z] APP FATAL (sample.js:20) - the value of "hoge" at {"hoge":100} is 100
```

- TRACE/DEBUG/INFO log outs to `STDOUT`
- WANR/ERROR/FATAL log outs to `STDERROR`


or open `sample/index.html` in browser

## format

format has these place-holder

- `%date`: current date time with `date.toISOString()`. change format with override `Logger.prototype._date`.
- `%level`: level of log name in upper case (`DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL`).
- `%category`: set by `getLogger()` first arg.
- `%message`: given args to logger. string or serialized number/object/functions.
- `%file`: file name and line number, but has performace consideration.

**caution**: `%file` is build by stack trace from Error object because JS doesn't has API for that.
this is heavy operation, so consider carefully in production environment.

using `file` only in develop environment and replace format in production are recomended.
if you wanna get more info in production, use `logger.trace()` or out the given Error instance,
which has `stack` property.

## localStorage

save logs to localStorage on browser by specifying `storage` option.
saving are non blocking using `setTimeout`.

- type: storage type, default to 'localStorage' and supported that only now.
- key: key of storage column, default to 'logStorage'. keep all log in 1 column of storage for avoid occupy storage, and save order of log.
- limit: limit for save to storage, defalut to 20K. remove as FIFO


## install & commands

```sh
$ npm install logmorphic
```

you can call all build task from npm run-scripts.
(actually it calls gulp task, please see package.json scripts directive.

```sh
$ npm install
$ npm test
$ npm run lint
```

## TypeScript support

use [logmorphic.d.ts](./logmorphic.d.ts) for typescript.


## FAQ

### how to save logs to the file ?

logmorphic currentry doesn't support logging to file.
because system usually running with process management tools like supervisord, forever, monit etc
they usually have logging support which gets log from STDOUT/STDERROR, and saves to file, logserver, fluentd etc,
and also log-rotation, log-versioning, log-destroy or so. just use that.


## CHANGELOG

- v0.0.5: update dependencies and fix for new .eslintrc


## License

MIT: http://jxck.mit-license.org/
