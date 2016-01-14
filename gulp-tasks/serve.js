var gulp = require('gulp');
var browserSync = require('browser-sync');

var config = require('./build.config.js');

gulp.task('serve', ['build:dev'], function(done) {
  browserSync({
    online: false,
    open: false,
    port: 9000,
    server: {
      baseDir: [config.outputDir]     
    }
  }, done);
  
  gulp.watch(config.src, ['watch']);
});

gulp.task('watch', ['build:dev'], browserSync.reload);