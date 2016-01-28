var gulp = require('gulp');
var browserSync = require('browser-sync');

var config = require('./build.config.js');

gulp.task('serve', ['build:dev'], function (done) {
    browserSync.init({
        open: true,
        port: 9000,
        server: {
            baseDir: [config.outputDir]
        }
    });

    gulp.watch(config.src, ['watch']);
});

gulp.task('serve-e2e', ['build:dev'], function (done) {
    browserSync.init({
        open: true,
        port: 9000,
        server: {
            baseDir: [config.outputDir]
        }
    });
});

gulp.task('watch', ['build:dev'], browserSync.reload);