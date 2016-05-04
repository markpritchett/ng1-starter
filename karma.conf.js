module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'], 
    reporters: ['progress', 'coverage', 'html'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
    preprocessors: {
      'src/app/**/!(*.spec|*.po|*.scenario).js': ['coverage']
    },
    htmlReporter: {
      preserveDescribeNesting: true
    }
  });
};
