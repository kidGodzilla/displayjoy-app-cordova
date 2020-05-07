package <packageName>;

import android.content.Context;
import android.content.Intent;

import android.app.Activity;
import android.app.AlarmManager;
import android.app.PendingIntent;

public class MyExceptionHandler implements
        java.lang.Thread.UncaughtExceptionHandler {
    private final Context myContext;
    private final Class<?> myActivityClass;
    private Activity myActivity;

    public MyExceptionHandler(Activity a, Context context, Class<?> c) {

        myContext = context;
        myActivityClass = c;
        myActivity = a;
    }

    public static void doRestart(Context c) {
        try {
            //check if the context is given
            if (c != null) {
                //fetch the packagemanager so we can get the default launch activity
                // (you can replace this intent with any other activity if you want
                PackageManager pm = c.getPackageManager();
                //check if we got the PackageManager
                if (pm != null) {
                    //create the intent with the default start activity for your application
                    Intent mStartActivity = pm.getLaunchIntentForPackage(
                            c.getPackageName()
                    );
                    if (mStartActivity != null) {
                        mStartActivity.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                        //create a pending intent so the application is restarted after System.exit(0) was called.
                        // We use an AlarmManager to call this intent in 100ms
                        int mPendingIntentId = 223344;
                        PendingIntent mPendingIntent = PendingIntent
                                .getActivity(c, mPendingIntentId, mStartActivity,
                                        PendingIntent.FLAG_CANCEL_CURRENT);
                        AlarmManager mgr = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
                        mgr.set(AlarmManager.RTC, System.currentTimeMillis() + 100, mPendingIntent);
                        //kill the application
                        System.exit(0);
                    } else {
                        Log.e(TAG, "Was not able to restart application, mStartActivity null");
                    }
                } else {
                    Log.e(TAG, "Was not able to restart application, PM null");
                }
            } else {
                Log.e(TAG, "Was not able to restart application, Context null");
            }
        } catch (Exception ex) {
            Log.e(TAG, "Was not able to restart application");
        }
    }

    public void uncaughtException(Thread thread, Throwable exception) {

        doRestart(myContext);

        /* Intent intent = myContext.getPackageManager().getLaunchIntentForPackage(myContext.getPackageName() );

        intent.addFlags(FLAG_ACTIVITY_NEW_TASK);
        intent.putExtra(KEY_RESTART_INTENT, intent);
        myContext.startActivity(intent);
        
        if (myContext instanceof Activity) {
          ((Activity) myContext).finish();
        }

        Runtime.getRuntime().exit(0);
        System.exit(2); */
            
                  
        /* Log.e("", "restarting app");
        Intent restartIntent = myContext.getPackageManager()
                .getLaunchIntentForPackage(myContext.getPackageName() );
        PendingIntent intent = PendingIntent.getActivity(
                myContext, 0,
                restartIntent, Intent.FLAG_ACTIVITY_CLEAR_TOP);
        AlarmManager manager = (AlarmManager) myContext.getSystemService(myContext.ALARM_SERVICE);
        manager.set(AlarmManager.RTC, System.currentTimeMillis() + 1, intent);
        System.exit(2); */
            
            
        /* Intent intent = new Intent(myActivity, myActivityClass);
        intent.putExtra("crash", true);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP
                | Intent.FLAG_ACTIVITY_CLEAR_TASK
                | Intent.FLAG_ACTIVITY_NEW_TASK);

        PendingIntent pendingIntent = PendingIntent.getActivity(myContext.getApplicationContext(), 0, intent, PendingIntent.FLAG_ONE_SHOT);

        AlarmManager mgr = (AlarmManager) myContext.getApplicationContext().getSystemService(Context.ALARM_SERVICE);
        mgr.set(AlarmManager.RTC, System.currentTimeMillis() + 100, pendingIntent);

//        android.os.Process.killProcess(android.os.Process.myPid());
        myActivity.finish();
        System.exit(2); */
    }
}
