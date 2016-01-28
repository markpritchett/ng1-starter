var wiredep = require('wiredep');
var bowerFiles = wiredep({ devDependencies: true })['js'];
var cfg = require('./gulp-tasks/build.config.js'); 
var buildHelper = require('./gulp-tasks/build.common.js');

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [].concat(bowerFiles, cfg.appJs, cfg.unitTestingFiles),   
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  });
};
