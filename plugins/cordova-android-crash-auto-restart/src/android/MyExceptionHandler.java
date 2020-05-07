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

    public void uncaughtException(Thread thread, Throwable exception) {

        Intent intent = myContext.getPackageManager().getLaunchIntentForPackage(myContext.getPackageName() );

        intent.addFlags(FLAG_ACTIVITY_NEW_TASK);
        intent.putExtra(KEY_RESTART_INTENT, intent);
        myContext.startActivity(intent);
        
        if (myContext instanceof Activity) {
          ((Activity) myContext).finish();
        }

        Runtime.getRuntime().exit(0);
        System.exit(2);
            
                  
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
