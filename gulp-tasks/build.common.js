var gulp = require('gulp');
var del = require('del');
var wiredep = require('wiredep');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var inject = require('gulp-inject');
var globule = require('globule');

var config = require('./build.config.js');

gulp.task('build:clean', function (done) {
    del([config.buildDir, config.outputDir]).then(function () {
        done();
    });
});

module.exports = {
    getAppJsFiles: function (jsFiles) {
        var appJsFiles = config.appJs.map(function (f) { return config.srcDir + f; });
        var filepaths = globule.find(appJsFiles);
        console.log(appJsFiles);
        config.modes.forEach(function (m) {
            var overriddenFile = filepaths.filter(function (f) {
                return f.indexOf('.' + m + '.js') > -1;
            })[0];

            if (overriddenFile) {
                if (m !== config.mode) {
                    filepaths.splice(filepaths.indexOf(overriddenFile), 1);
                }
                else {
                    var originalFile = filepaths.filter(function (f) {
                        return f === overriddenFile.replace('.' + config.mode, '');
                    })[0];

                    filepaths.splice(filepaths.indexOf(originalFile), 1);
                }
            }
        });
        console.log(filepaths); 
        return filepaths;
    },
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
            .pipe(minifyCss())
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