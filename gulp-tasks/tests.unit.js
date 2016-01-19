var gulp = require('gulp');
var wiredep = require('wiredep');
var Server = require('karma').Server;
var karmaFile = __dirname + '/../karma.conf.js';
var bowerFiles = wiredep({ devDependencies: true })['js'];
var buildCommon = require('./build.common.js');
var config = require('./build.config.js'); 

//var files = [].concat(bowerFiles, buildCommon.getAppJsFiles(cfg.appJs));

var conventionFileFilter = require('./conventionFileFilter.js');
//console.log(files);
/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
    var files = [].concat(config.appJs, config.unitTestingFiles).map(function(f) {
       return config.srcDir + f;
    });
    var appJsFiles = conventionFileFilter.getFiles({
        baseDir: config.srcDir,
        files: files,
        modes: config.modes,
        mode: config.mode,
        debug: true
    });
  new Server({
    configFile: karmaFile,
    singleRun: true,
    //files: files
    files: [].concat(bowerFiles, appJsFiles )
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

gulp.task('file-filter', function(){
    conventionFileFilter.getFiles({
        files: [
            './src/app/templates.js',
            './src/app/app.module.js',	
            './src/app/**/module.js',
            './src/app/**/!(*.po|*.scenario).js'
        ],
        modes: ['local', 'dev', 'prod'],
        mode: 'local',
        debug: true
    });
});

