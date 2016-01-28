var gulp = require('gulp');
var del = require('del');
var wiredep = require('wiredep');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');

var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var inject = require('gulp-inject');

var config = require('./build.config.js');

gulp.task('build:clean', function (done) {
    del([config.builtSrc, config.outputFiles]).then(function () {
        done();
    });
});

module.exports = {
    getBowerFiles: function (ext) {
        return wiredep({
            directory: './bower_components',
            bowerJson: require('./../bower.json')
        })[ext];
    },
    bundleJs: function (src, outputFilename, outputDir) {
        return gulp
            .src(src)
            .pipe(concat(outputFilename))
            .pipe(uglify())
            .pipe(rev())
            .pipe(gulp.dest(outputDir));
    },
    bundleCss: function (src, outputFilename, outputDir) {
        return gulp
            .src(src)
            .pipe(concat(outputFilename))
            .pipe(cssnano())
            .pipe(rev())
            .pipe(gulp.dest(outputDir));
    },
    inject: function (srcFile, filesToInject, outputDir) {
        return gulp.
            src(srcFile)
            .pipe(inject(gulp.src(filesToInject, { read: false }), { relative: true, removeTags: true }))
            .pipe(gulp.dest(outputDir));
    }
};