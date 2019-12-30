#!/usr/bin/env node

module.exports = function (context) {
    var fs = require('fs'),
        path = require('path'),
        platformRoot = path.join(context.opts.projectRoot, 'platforms/android'),
        manifestFile = path.join(platformRoot, 'AndroidManifest.xml');

    if (fs.existsSync(manifestFile)) {
        fs.readFile(manifestFile, 'utf8', function (err, data) {
            if (err) {
                throw new Error('Unable to find AndroidManifest.xml: ' + err);
            }
            if (!(/<application[^>]*\bandroid:banner/).test(data)) {
                console.log('Adding banner attribute');
                data = data.replace(/<application/g, '<application android:banner="@drawable/banner"');
            }
            if (!(/<application[^>]*\bandroid:isGame/).test(data)) {
                console.log('Adding isGame attribute');
                data = data.replace(/<application/g, '<application android:isGame="false"');
            }
            fs.writeFile(manifestFile, data, 'utf8', function (err) {
                if (err) throw new Error('Unable to write into AndroidManifest.xml: ' + err);
            })
        });
    }
};
