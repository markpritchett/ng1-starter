var gulp = require('gulp');
var Server = require('karma').Server;
var karmaFile = __dirname + '/../karma.conf.js';

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  new Server({
    configFile: karmaFile,
    singleRun: true
  }, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
  new Server({
    configFile: karmaFile,
  }, done).start();
});