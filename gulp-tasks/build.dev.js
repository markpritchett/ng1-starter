var gulp = require('gulp');
var path = require('path');
var preprocess = require('gulp-preprocess');
var tap = require('gulp-tap');
var buildHelpers = require('./build.common.js');
var config = require('./build.config.js');
var conventionFileFilter = require('./conventionFileFilter.js');

var filesToInject = [];

gulp.task('build:dev', ['add-filenames'], function () {
    return gulp
        .src(config.builtSrc)
        .pipe(gulp.dest(config.outputDir));
});

gulp.task('add-filenames', ['debug-preprocess'], function() {
    return gulp
        .src(config.builtSrc)
        .pipe(tap(function(file) {
            var filename = file.path.substring(file.path.indexOf('/app/'));
            if (file.path.indexOf('/app/') > 0 && path.extname(file.path) === '.html') {
                file.contents = Buffer.concat([
                    new Buffer('<!-- begin: ' + filename + ' -->\r\n'),
                    file.contents,
                    new Buffer('\r\n<!-- end: ' + filename + ' -->'),
                ]);
            }
        }))
        .pipe(gulp.dest(config.buildDir));
});

gulp.task('debug-preprocess', ['build:dev:inject'], function() {
    return gulp
        .src(config.builtSrc)
        .pipe(preprocess({context: { mode: config.mode }})) 
        .pipe(gulp.dest(config.buildDir));
});

gulp.task('build:dev:inject', ['build:dev:copy', 'app-js', 'app-css'], function () {
    return buildHelpers.inject(config.indexHtml, filesToInject, config.buildDir);
});

gulp.task('build:dev:copy', ['build:clean'], function () {
    return gulp
        .src(config.src)
        .pipe(gulp.dest(config.buildDir));
});

gulp.task('app-js', ['vendor-js'], function () {
    var files = config.appJs.map(function(f) {
       return config.srcDir + f;
    });
    var appJsFiles = conventionFileFilter.getFiles({
        baseDir: config.srcDir,
        files: files,
        modes: config.modes,
        mode: config.mode,
        debug: true
    });
    appJsFiles.forEach(AddAppAssetToFilesToInject);
});

gulp.task('vendor-js', ['build:dev:copy'], function () {
    var files = buildHelpers.getBowerFiles('js');

    addVendorAssetsToFilesToInject(files, config.vendorJsDir);

    return gulp
        .src(files)
        .pipe(gulp.dest(config.vendorJsDir));
});

gulp.task('app-css', ['vendor-css'], function () {
    config.appCss.forEach(AddAppAssetToFilesToInject);
});

gulp.task('vendor-css', ['build:dev:copy'], function () {
    var files = buildHelpers.getBowerFiles('css');

    addVendorAssetsToFilesToInject(files, config.vendorCssDir);

    return gulp
        .src(files)
        .pipe(gulp.dest(config.vendorCssDir));
});

function addVendorAssetsToFilesToInject(files, outputDir) {
    files.forEach(function (f) {
        filesToInject.push(outputDir + '/' + path.basename(f));
    });
}

function AddAppAssetToFilesToInject(f) { 
    filesToInject.push(config.buildDir + '/' + f.replace(config.srcDir, ''));
 }