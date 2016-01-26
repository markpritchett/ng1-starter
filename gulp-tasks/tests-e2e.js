var gulp = require('gulp');
var protractor = require("gulp-protractor").protractor;
var webdriverUpdate = require('gulp-protractor').webdriver_update;

// Needs to run 'webdriver-manager start' in a separate console
// before running this.
gulp.task('test:e2e', function () {
    return gulp
        .src([".././src/app/**/*.e2e.js", ".././src/app/**/*.po.js"])
        .pipe(protractor({
            configFile: "./protractor.config.js"
        }))
        .on('error', function (e) { console.log(e); throw e; });
});