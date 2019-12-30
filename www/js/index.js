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

var initialHref = 'https://app.displayjoy.com', timer1, timer2, deviceInfo = "?";

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
        deviceInfo += '&versioncode=' + VERSIONCODE;
        deviceInfo += '&app=' + APPVERSION;
    } catch(e){}
}

function loadApp () {
    App = document.getElementById('app');
    clearInterval(timer1);
    clearTimeout(timer2);


    // Reload every 24 hours
    timer1 = setInterval(function () {
        App.src = '';
        App.src = initialHref + deviceInfo;
    }, 24 * 60 * 60 * 1000);

    App.src = initialHref + deviceInfo;
}


var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        // Update device info
        setTimeout(function () { updateDeviceInfo() }, 200);

        // Load app
        setTimeout(function () { loadApp() }, 400);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};

app.initialize();
