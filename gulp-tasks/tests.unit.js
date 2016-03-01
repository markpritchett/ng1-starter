var gulp = require('gulp');
var wiredep = require('wiredep');
var Server = require('karma').Server;
var karmaFile = __dirname + '/../karma.conf.js';
var bowerFiles = wiredep({ devDependencies: true })['js'];
var buildCommon = require('./build.common.js');
var config = require('./build.config.js');
var conventionFileFilter = require('./conventionFileFilter.js');

function getFiles() {
    var files = [].concat(config.appJs, config.unitTestingFiles).map(function (f) {
        return config.srcDir + f;
    });
    var appJsFiles = conventionFileFilter.getFiles({
        baseDir: config.srcDir,
        files: files,
        modes: config.modes,
        mode: config.mode,
        debug: false
    });

    return [].concat(bowerFiles, appJsFiles, './build/app/templates.js');
}

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
    new Server({
        configFile: karmaFile,
        singleRun: true,
        files: getFiles()
    }, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', ['template-cache'], function (done) {
    new Server({
        configFile: karmaFile,
        files: getFiles()
    }, done).start();
});
