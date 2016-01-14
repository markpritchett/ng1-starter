var gulp = require('gulp');
var path = require('path');
var preprocess = require('gulp-preprocess');
var buildHelpers = require('./build.common.js');
var config = require('./build.config.js');

var filesToInject = [];

gulp.task('build:dev', ['debug-preprocess'], function () {
    return gulp
        .src(config.builtSrc)
        .pipe(gulp.dest(config.outputDir));
});

gulp.task('debug-preprocess', ['build:dev:inject'], function() {
    return gulp
        .src(config.builtSrc)
        .pipe(preprocess({context: { mode: config.mode }})) //To set environment variables in-line 
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
    buildHelpers.getAppJsFiles(config.appJs).forEach(AddAppAssetToFilesToInject);
});

gulp.task('vendor-js', ['build:clean'], function () {
    var files = buildHelpers.getBowerFiles('js');

    addVendorAssetsToFilesToInject(files, config.vendorJsDir);

    return gulp
        .src(files)
        .pipe(gulp.dest(config.vendorJsDir));
});

gulp.task('app-css', ['vendor-css'], function () {
    config.appCss.forEach(AddAppAssetToFilesToInject);
});

gulp.task('vendor-css', ['build:clean'], function () {
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