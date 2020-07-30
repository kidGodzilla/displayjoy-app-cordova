var exec = require('cordova/exec');

function restartappplugin() {};

restartappplugin.prototype.setCustomExcpetionHandler = function () {
    exec(function (res) {}, function (err) {}, "restartappplugin", "setCustomExceptionHandler", []);
}

restartappplugin.install = function () {
    if (!window.plugins) {
        window.plugins = {};
    }
    window.plugins = new restartappplugin();
    return window.plugins;
}

cordova.addConstructor(restartappplugin.install);
module.exports = new restartappplugin();