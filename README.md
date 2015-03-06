# logmorphic

isomorphic logger.
you can also save to localStorage.

## API

```js
var Logger = Logger || require('../logstorage.js').Logger;

var format = '[%date] %category %level (%file) - %message';
var appLogger = Logger.getLogger('APP', {
  loglevel: 'FATAL',
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

## install & commands

```sh
$ npm install logstorage
```

you can call all build task from npm run-scripts.
(actually it calls gulp task, please see package.json scripts directive.

```sh
$ npm install
$ npm test
$ npm lint
```

## License

The MIT License (MIT)
Copyright (c) 2013 Jxck