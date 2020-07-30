package com.restartappplugin;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaInterface;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.content.Intent;
import android.app.Activity;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.util.Log;

/**
 * This class echoes a string called from JavaScript.
 */
public class restartappplugin extends CordovaPlugin {
    private Class<?> activityClass;
    private Activity activity;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        this.activity = cordova.getActivity();
        this.activityClass = this.activity.getClass();
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("setCustomExceptionHandler")) {
            this.setCustomExceptionHandler(this.activity, this.activityClass, callbackContext);
            return true;
        }
        return false;
    }

    private void setCustomExceptionHandler(Activity activity, Class<?> activityClass, CallbackContext callbackContext) {
        this.cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Thread.setDefaultUncaughtExceptionHandler(new CustomExceptionHandler(activity, activityClass));
                callbackContext.success("Custom exception handler set");
            }
        });

    }

    class CustomExceptionHandler implements java.lang.Thread.UncaughtExceptionHandler {
        private final Class<?> activityClass;
        private Activity activity;
        private final static String TAG = "CustomExceptionHandler";

        public CustomExceptionHandler(Activity a, Class<?> c) {
            this.activityClass = c;
            this.activity = a;
        }

        public void uncaughtException(Thread thread, Throwable exception) {
            Intent intent = new Intent(this.activity, this.activityClass);
            intent.putExtra("crash", true);
            intent.addFlags(
                    Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);

            PendingIntent pendingIntent = PendingIntent.getActivity(cordova.getActivity().getApplicationContext(), 0,
                    intent, PendingIntent.FLAG_CANCEL_CURRENT);

            AlarmManager mgr = (AlarmManager) cordova.getActivity().getApplicationContext()
                    .getSystemService(Context.ALARM_SERVICE);
            mgr.set(AlarmManager.RTC, System.currentTimeMillis() + 2000, pendingIntent);

            Log.i(TAG, "Setting up alarm manager and pending intent");

            this.activity.finish();
            System.exit(2);
        }
    }

}
