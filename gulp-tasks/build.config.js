var config = {
	src: './src/**',
	srcDir: './src',
	buildDir: './build',
	outputDir: './dist',
    modes: ['local', 'dev', 'prod'],
    mode: 'dev'    
};

config.srcFiles = config.srcDir + '/**';
config.buildFiles = config.buildDir + '/**';
config.outputFiles = config.outputDir + '/**';

config.indexHtml = config.buildDir + '/index.html';
config.vendorJsDir = config.buildDir + '/vendor/js';
config.vendorCssDir = config.buildDir + '/vendor/css';
config.templateCacheSrc = './src/app/*/*.html';
config.templateCacheDest = './build/app';

config.builtSrc = config.buildDir + '/**';
config.outputFiles = config.outputDir + '/**';

config.appJs = [
	'/app/templates.js',
    '/app/app.module.js',	
    '/app/**/module.js',
    '/app/**/!(*.spec|*.po|*.scenario).js'
];

config.unitTestingFiles = [		
    './app/**/*.spec.js'
];

config.e2eFiles = [	
    './app/**/(*.po|*.scenario).js'
];

config.appCss = [
	'./css/site.css'
];

config.appJsBundle = {	
	name: 'app.js',
	files: config.appJs.map(function (f) { return './src/' + f; })
};

config.vendorJsBundle = {
	name: 'vendor.js'
};

config.appCssBundle = {
	name: 'app.css',
	files: config.appCss.map(function (f) { return './src/' + f; })
};

config.vendorCssBundle = {
	name: 'vendor.css'
};

module.exports = config;