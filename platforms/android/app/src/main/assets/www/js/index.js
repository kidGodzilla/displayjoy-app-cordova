/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var initialHref = 'https://app.displayjoy.com', timer1, deviceInfo = "?";
var browserOptions = 'location=no,zoom=no,hidden=yes,toolbar=no,status=no,titlebar=no,presentationstyle=fullscreen,disallowoverscroll=yes,allowInlineMediaPlayback=yes,mediaPlaybackRequiresUserAction=no';

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        try {
            deviceInfo += 'manufacturer=' + encodeURIComponent(device.manufacturer);
            deviceInfo += '&platform=' + encodeURIComponent(device.platform);
            deviceInfo += '&version=' + encodeURIComponent(device.version);
            deviceInfo += '&cordova=' + encodeURIComponent(device.cordova);
            deviceInfo += '&serial=' + encodeURIComponent(device.serial);
            deviceInfo += '&model=' + encodeURIComponent(device.model);
            deviceInfo += '&uuid=' + encodeURIComponent(device.uuid);
            deviceInfo += '&app=' + '1.0.18';
        } catch(e){}

        var browser = cordova.InAppBrowser.open(initialHref + deviceInfo, '_self', browserOptions);

        function reloadBrowser () {
            browser.executeScript({ code: "window.location.reload(true);" });
        }

        // Events to occur once the page finishes loading (similar to child onReady event)
        browser.addEventListener('loadstop', function () {
            try { browser.show(); } catch(e){}
        });

        // Reload InAppBrowser every 24 hours
        timer1 = setInterval(reloadBrowser, 24 * 60 * 60 * 1000);
        browser.addEventListener('loaderror', reloadBrowser);

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');
        //
        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();