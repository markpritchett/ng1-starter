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
    getAppJsFiles: function(jsFiles) {
        var appJsFiles = config.appJs.map(function(f) { return config.srcDir + f});
        var filepaths = globule.find(appJsFiles);
        
        var overriddenFiles = filepaths.filter(function(f) {
            return f.indexOf('.' + config.mode + '.js') > -1;
        });
        
        var originalFiles = [];
        
        overriddenFiles.forEach(function(of) {
            var originalFile = filepaths.filter(function(f) {
                    return f === of.replace('.' + config.mode, '');
            })[0];
            
            originalFiles.push(originalFile);
        });
        
        var otherModes = config.modes.filter(function(m) { 
            return m !== config.mode;
        });
        
        var otherModeFileOverrides = [];
        
        otherModes.forEach(function(om) {
            overriddenFiles.forEach(function(of) {
                var omFile = filepaths.filter(function(f) {
                    var otherModeFile = of.replace('.' + config.mode + '.js', '.' + om + '.js');
                    return otherModeFile === f;
                })[0]; 
                
                if(omFile){
                    otherModeFileOverrides.push(omFile);    
                } 
            });
        })
        
        originalFiles.forEach(function(of) {
            filepaths.splice(filepaths.indexOf(of),1);
        });
        
        otherModeFileOverrides.forEach(function(of) {
            filepaths.splice(filepaths.indexOf(of),1);
        });

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