
var initialHref = 'https://app.displayjoy.com/wrapper.html?w', App, timer1, timer2, displayKeyFromConfig, displayUrlFromConfig, displayKey, redirectUrl, deviceInfo = "&", APPVERSION = 'Unknown';

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};

app.initialize();


function setIframeLocalStorage (key, value) {
    try {
        return document.querySelector('iframe').contentWindow.localStorage.setItem(key, value);

    } catch(e){}
}

function getIframeLocalStorage (key, cb) {
    if (!cb || typeof cb !== 'function') return;

    try {
        var value = document.querySelector('iframe').contentWindow.localStorage.getItem(key);
        cb(value);
    } catch(e){}
}

function getAllIframeLocalStorage (cb) {
    if (!cb || typeof cb !== 'function') return;

    try {
        var _lsBackup = {};

        _lsBackup = JSON.parse(JSON.stringify(document.querySelector('iframe').contentWindow.localStorage));
        cb(_lsBackup);

    } catch(e){}
}

function removeIframeLocalStorage (key) {
    try {
        return document.querySelector('iframe').contentWindow.localStorage.removeItem(key);

    } catch(e){}
}

function isSiteOnline (url, callback) {
    // try to load favicon
    var timer = setTimeout(function () {
        // timeout after 5 seconds
        callback(false);
    }, 5000);

    var img = document.createElement('img');

    img.onload = function () {
        clearTimeout(timer);
        callback(true);
    };

    img.onerror = function (e) {
        console.log(JSON.stringify(e));
        clearTimeout(timer);
        callback(false);
    };

    img.src = url + '/favicon.ico';
}

function reloadBrowser () {
    reloadApp();
}

function isInKiosk (cb) {
    Kiosk.isInKiosk(function (isInKiosk) {
        console.log('Is in kiosk mode:', isInKiosk);
        if (cb && typeof cb == 'function') cb(isInKiosk);
    });
}

function isSetAsLauncher (cb) {
    Kiosk.isSetAsLauncher(function (isLauncher) {
        console.log('Is set as launcher:', isLauncher);
        if (cb && typeof cb == 'function') cb(isLauncher);
    });
}

function toggleKiosk (b, cb) {
    Kiosk.setKioskEnabled(b);

    if (cb && typeof cb == 'function') isInKiosk(cb);
}

function switchLauncher (cb) {
    Kiosk.switchLauncher();

    if (cb && typeof cb == 'function') cb();
}

function getDisplayKeyFromNativeStorage () {
    NativeStorage.getItem('__key', function (key) {
        if (key) displayKey = key;
        constructInitialHref();

    }, function () { console.log('Error getting native storage') });

    NativeStorage.getItem('__url', function (url) {
        if (url) redirectUrl = url;
        constructInitialHref();

    }, function () { console.log('Error getting native storage') });
}

function loadApp () {
    App = document.getElementById('app');
    clearInterval(timer1);
    clearTimeout(timer2);
    getAppVersion();

    // Reload every 24 hours
    timer1 = setInterval(function () {
        App.src = '';
        App.src = initialHref + deviceInfo;
    }, 24 * 60 * 60 * 1000);

    App.src = initialHref + deviceInfo;
}

function reloadApp () {
    App = document.getElementById('app');
    App.src = initialHref + deviceInfo;
}

function runLoop () {
    getAllIframeLocalStorage(function (_ls) {
        var _requestClearLocalCache = _ls['_requestClearLocalCache'];
        var _requestSwitchLauncher = _ls['_requestSwitchLauncher'];
        var _requestReloadBrowser = _ls['_requestReloadBrowser'];
        var _requestSetBrightness = _ls['_requestSetBrightness'];
        var _requestClearStorage = _ls['_requestClearStorage'];
        var _requestToggleKiosk = _ls['_requestToggleKiosk'];
        var _requestAutostart = _ls['_requestAutostart'];
        var _redirectUrl = _ls['_redirectUrl'];
        var _displayKey = _ls['_displayKey'];

        // Handle NativeStorage stashed display key
        //var __key = _redirectUrl || _displayKey;

        if (_displayKey) {
            NativeStorage.setItem('__key', _displayKey, function () { console.log('Successfully set key in native storage') }, function () { console.log('Error setting key in native storage') });
            displayKey = _displayKey;
        }

        if (_redirectUrl) {
            NativeStorage.setItem('__url', _redirectUrl, function () { console.log('Successfully set url in native storage') }, function () { console.log('Error setting url in native storage') });
            redirectUrl = _redirectUrl;
        }

        // Request autostart enable / disable
        if (_requestAutostart) {
            removeIframeLocalStorage('_requestAutostart');

            if (_requestAutostart == 'true') {
                cordova.plugins.autoStart.enable();
                console.log('Enabling Autostart');

            } else if (_requestAutostart == 'false') {
                cordova.plugins.autoStart.disable();
                console.log('Disabling Autostart');
            }
        }

        // Allow the clear cache button to clear Nativestorage
        if (_requestClearStorage) {
            NativeStorage.clear(function () {
                console.log('Successfully cleared native storage');
                removeIframeLocalStorage('_requestClearStorage');
                displayKey = null;

                constructInitialHref();

            }, function () { console.log('Error clearing native storage') });
        }

        if (_requestReloadBrowser) {
            removeIframeLocalStorage('_requestReloadBrowser');

            setTimeout(function () {
                reloadBrowser();
            }, 5000);
        }

        if (_requestSetBrightness) {
            _requestSetBrightness = parseFloat(_requestSetBrightness);

            try {
                cordova.plugins.brightness.setBrightness(_requestSetBrightness, function (level) {
                    console.log('Current brightness level: ', level);
                    removeIframeLocalStorage('_requestSetBrightness');
                }, function (e) { console.log(e) });
            } catch(e) { console.log(e) }
        }

        // User is requesting that we toggle kiosk mode (android)
        if (_requestToggleKiosk) {
            if (_requestToggleKiosk == 'true') {
                toggleKiosk(false, function (succeeded) {
                    removeIframeLocalStorage('_requestToggleKiosk');
                });
            } else if (_requestToggleKiosk == 'false') {
                toggleKiosk(true, function (succeeded) {
                    removeIframeLocalStorage('_requestToggleKiosk');
                });
            }
        }

        // User is requesting that we switch launchers (android)
        if (_requestSwitchLauncher && _requestSwitchLauncher == 'true') {
            switchLauncher(function () {
                removeIframeLocalStorage('_requestSwitchLauncher');
            });
        }

        // User is requesting that we clear all local data (for troubleshooting?)
        if (_requestClearLocalCache) {

            removeIframeLocalStorage('_cacheResetMessage');

            // Get all iFrame local storage
            getAllIframeLocalStorage(function (_lsBackup) {

                if (_requestClearLocalCache == 'everything') _lsBackup = {};

                window.CacheClear(function (status) {
                    console.log('Message: ' + status);

                    setIframeLocalStorage('_cacheResetMessage', status + ' - ' + (new Date()).toString());
                    removeIframeLocalStorage('_requestClearLocalCache');

                    // Recreate all previous local storage values
                    Object.keys(_lsBackup).forEach(function (_k) {
                        var val = _lsBackup[_k];
                        setIframeLocalStorage(_k, val);
                    });

                    setIframeLocalStorage('_cacheCleared', (+ new Date()));

                }, function (status) {
                    console.log('Error: ' + status);
                });

            });
        }

        // Detect if isInKiosk
        isInKiosk(function (isEnabled) {
            setIframeLocalStorage('_isInKioskMode', isEnabled);
        });

        // Detect if isSetAsLauncher
        isSetAsLauncher(function (isEnabled) {
            setIframeLocalStorage('_isSetAsLauncher', isEnabled);
        });
    });

    // if (window.AndroidFullScreen) AndroidFullScreen.immersiveMode(console.log, console.log);
    window.plugins.insomnia.keepAwake();
    // StatusBar.hide();
}

function getValuesFromEMM () {
    // Read values from EMM (standardized EMM/MDM app config)
    try {
        displayKeyFromConfig = cordova.plugins.EmmAppConfig.getValue('displayKey');
        displayUrlFromConfig = cordova.plugins.EmmAppConfig.getValue('displayUrl');
        constructInitialHref();
    } catch(e){ console.log(e) }
}

function getAppVersion (cb) {
    try {
        cordova.getAppVersion.getVersionNumber(function (version) {
            APPVERSION = version;
            updateDeviceInfo();

            if (cb && typeof cb == 'function') cb();
        });
    } catch (e) {
        console.log(e);

        if (cb && typeof cb == 'function') cb();
    }
}


function updateDeviceInfo () {
    try {
        deviceInfo = '&';
        deviceInfo += 'manufacturer=' + encodeURIComponent(device.manufacturer);
        deviceInfo += '&platform=' + encodeURIComponent(device.platform);
        deviceInfo += '&version=' + encodeURIComponent(device.version);
        deviceInfo += '&cordova=' + encodeURIComponent(device.cordova);
        deviceInfo += '&serial=' + encodeURIComponent(device.serial);
        deviceInfo += '&model=' + encodeURIComponent(device.model);
        deviceInfo += '&uuid=' + encodeURIComponent(device.uuid);
        deviceInfo += '&app=' + APPVERSION;
    } catch(e){}
}

function constructInitialHref () {
    initialHref = 'https://app.displayjoy.com/wrapper.html?w';

    if (displayUrlFromConfig) initialHref = displayUrlFromConfig;
    else if (displayKeyFromConfig) initialHref = 'https://app.displayjoy.com/wrapper.html?key=' + displayKeyFromConfig;
    else if (redirectUrl) initialHref = redirectUrl;
    else if (displayKey) initialHref = 'https://app.displayjoy.com/wrapper.html?key=' + displayKey;
}

document.addEventListener('deviceready', function () {
    try {
        var Sentry = cordova.require("sentry-cordova.Sentry");
        Sentry.init({ dsn: 'https://5b6850da36474f6ba4f92e3a19b8975b@sentry.io/1422424' });
    } catch(e){}

    getDisplayKeyFromNativeStorage();
    constructInitialHref();
    getValuesFromEMM();

    // Update device info
    setTimeout(function () { updateDeviceInfo() }, 200);

    // Load app in 5s if event does not fire
    timer2 = setTimeout(loadApp, 5000);

    // Execute runLoop every 10s
    setInterval(runLoop, 10000);
    setTimeout(runLoop, 2000);

    // Try to get app version and version code dynamically via plugin before loading app
    setTimeout(function () { getAppVersion(function () { loadApp() }) }, 300);

    // Reload the client application when coming back online
    document.addEventListener('online', function (event) { reloadApp() });

    try { restartappplugin.setCustomExceptionHandler() } catch(e){}

}, false);
