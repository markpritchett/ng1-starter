var globule = require('globule');
var path = require('path');

module.exports = {
    getFiles: function (options) {
        var filepaths = globule.find(options.files);

        if (options.debug) {
            console.log('get files - original files', filepaths);
        }

        options.modes.forEach(function (m) {
            var overriddenFile = filepaths.filter(function (f) {
                return f.indexOf('.' + m + path.extname(f)) > -1;
            })[0];

            if (overriddenFile) {
                if (m !== options.mode) {
                    if (options.debug) {
                        console.log('get files - removing overridden file', overriddenFile, 'for other mode', m);
                    }
                    filepaths.splice(filepaths.indexOf(overriddenFile), 1);
                }
                else {
                    var originalFile = filepaths.filter(function (f) {
                        return f === overriddenFile.replace('.' + options.mode, '');
                    })[0];
                    
                    if (options.debug) {
                        console.log('get files - removing original file', originalFile);
                    }

                    filepaths.splice(filepaths.indexOf(originalFile), 1);
                }
            }
        });

        if (options.debug) {
            console.log('get files - filtered files', filepaths);
        }

        return filepaths;
    }
}