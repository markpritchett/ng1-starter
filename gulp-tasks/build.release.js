var gulp = require('gulp');
var inject = require('gulp-inject');
var templateCache = require('gulp-angular-templatecache');
var del = require('del');
var buildHelpers = require('./build.common.js');
var config = require('./build.config.js');

gulp.task('build:release', ['cleanup'], function () {
	return gulp
			.src(config.builtSrc)
			.pipe(gulp.dest(config.outputDir));
});

gulp.task('cleanup', ['inject'], function (done) {
	del('./build/app').then(function () {
		done();
	});
});

gulp.task('inject', ['copy-index'], function () {
	return gulp
		.src(config.indexHtml)
		.pipe(inject(gulp.src(['./build/vendor-*', './build/app-*'], { read: false }), { relative: true, removeTags: true }))
		.pipe(gulp.dest(config.buildDir));
});

gulp.task('copy-index', ['bundle'], function () {
	return gulp
		.src('./src/index.html')
		.pipe(gulp.dest(config.buildDir));
});

gulp.task('bundle', ['bundle:app-js', 'bundle:vendor-js', 'bundle:app-css', 'bundle:vendor-css'], function () {
	
});

gulp.task('bundle:app-js', ['template-cache'], function () {	
	return buildHelpers.bundleJs([].concat(config.appJsBundle.files,'./build/app/templates.js'), config.appJsBundle.name, config.buildDir);
});

gulp.task('template-cache', ['build:clean'], function () {
    return gulp
        .src(config.templateCacheSrc)
        .pipe(templateCache({
            root: 'app/'
        }))
        .pipe(gulp.dest(config.templateCacheDest));
});

gulp.task('bundle:vendor-js', ['build:clean'], function () {	
    return buildHelpers.bundleJs(buildHelpers.getBowerFiles('js'), config.vendorJsBundle.name, config.buildDir);
});

gulp.task('bundle:app-css', ['build:clean'], function () {	
	return buildHelpers.bundleCss(config.appCssBundle.files, config.appCssBundle.name, config.buildDir);
});

gulp.task('bundle:vendor-css', ['build:clean'], function () {	
	return buildHelpers.bundleCss(buildHelpers.getBowerFiles('css'), config.vendorCssBundle.name, config.buildDir);
});