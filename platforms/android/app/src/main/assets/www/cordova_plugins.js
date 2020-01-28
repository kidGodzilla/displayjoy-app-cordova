cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-inappbrowser.inappbrowser",
      "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
      "pluginId": "cordova-plugin-inappbrowser",
      "clobbers": [
        "cordova.InAppBrowser.open",
        "window.open"
      ]
    },
    {
      "id": "cordova-plugin-insomnia.Insomnia",
      "file": "plugins/cordova-plugin-insomnia/www/Insomnia.js",
      "pluginId": "cordova-plugin-insomnia",
      "clobbers": [
        "window.plugins.insomnia"
      ]
    },
    {
      "id": "cordova-plugin-brightness.Brightness",
      "file": "plugins/cordova-plugin-brightness/www/brightness.js",
      "pluginId": "cordova-plugin-brightness",
      "clobbers": [
        "cordova.plugins.brightness"
      ]
    },
    {
      "id": "cordova-plugin-app-version.AppVersionPlugin",
      "file": "plugins/cordova-plugin-app-version/www/AppVersionPlugin.js",
      "pluginId": "cordova-plugin-app-version",
      "clobbers": [
        "cordova.getAppVersion"
      ]
    },
    {
      "id": "cordova-plugin-cache-clear.CacheClear",
      "file": "plugins/cordova-plugin-cache-clear/www/CacheClear.js",
      "pluginId": "cordova-plugin-cache-clear",
      "clobbers": [
        "CacheClear"
      ]
    },
    {
      "id": "cordova-plugin-nativestorage.mainHandle",
      "file": "plugins/cordova-plugin-nativestorage/www/mainHandle.js",
      "pluginId": "cordova-plugin-nativestorage",
      "clobbers": [
        "NativeStorage"
      ]
    },
    {
      "id": "cordova-plugin-nativestorage.LocalStorageHandle",
      "file": "plugins/cordova-plugin-nativestorage/www/LocalStorageHandle.js",
      "pluginId": "cordova-plugin-nativestorage"
    },
    {
      "id": "cordova-plugin-nativestorage.NativeStorageError",
      "file": "plugins/cordova-plugin-nativestorage/www/NativeStorageError.js",
      "pluginId": "cordova-plugin-nativestorage"
    },
    {
      "id": "cordova-plugin-kiosk-launcher.kiosk",
      "file": "plugins/cordova-plugin-kiosk-launcher/www/kiosk.js",
      "pluginId": "cordova-plugin-kiosk-launcher",
      "clobbers": [
        "window.Kiosk"
      ]
    },
    {
      "id": "cordova-plugin-emm-app-config.emmappconfig",
      "file": "plugins/cordova-plugin-emm-app-config/www/emmappconfig.js",
      "pluginId": "cordova-plugin-emm-app-config",
      "clobbers": [
        "cordova.plugins.EmmAppConfig"
      ]
    },
    {
      "id": "cordova-plugin-network-information.network",
      "file": "plugins/cordova-plugin-network-information/www/network.js",
      "pluginId": "cordova-plugin-network-information",
      "clobbers": [
        "navigator.connection",
        "navigator.network.connection"
      ]
    },
    {
      "id": "cordova-plugin-network-information.Connection",
      "file": "plugins/cordova-plugin-network-information/www/Connection.js",
      "pluginId": "cordova-plugin-network-information",
      "clobbers": [
        "Connection"
      ]
    },
    {
      "id": "cordova-plugin-device.device",
      "file": "plugins/cordova-plugin-device/www/device.js",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    },
    {
      "id": "cordova-plugin-autostart.AutoStart",
      "file": "plugins/cordova-plugin-autostart/www/auto-start.js",
      "pluginId": "cordova-plugin-autostart",
      "clobbers": [
        "cordova.plugins.autoStart"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-custom-config": "5.1.0",
    "cordova-plugin-android-tv": "1.0.0",
    "cordova-plugin-inappbrowser": "3.1.0",
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-insomnia": "4.3.0",
    "cordova-plugin-brightness": "0.1.5",
    "cordova-plugin-app-version": "0.1.9",
    "cordova-plugin-cache-clear": "1.3.7",
    "cordova-plugin-nativestorage": "2.3.2",
    "cordova-plugin-kiosk-launcher": "0.2",
    "cordova-plugin-emm-app-config": "1.0.2",
    "cordova-plugin-network-information": "2.0.2",
    "cordova-plugin-device": "2.0.3",
    "cordova-plugin-autostart": "2.3.0",
    "cordova-android-crash-auto-restart": "0.0.1"
  };
});