var Logger = Logger || require('../').Logger;

var logger = Logger.getLogger('bench', {
  format: '%category %level       - %message'
});

console.time('bench');
for(var i = 0; i < 10000; i ++) {
  logger.info('test');
}
console.timeEnd('bench');
//         node, chrome, safari, firefox
// before: 1600,   1500,    461,     156
// after :  142,    726,    162,      65
