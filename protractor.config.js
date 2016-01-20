﻿exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',    
    specs: ['./src/app/**/*.scenario.js'],

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    },
    chromeOnly: true,
    baseUrl: 'http://localhost:9000'
};