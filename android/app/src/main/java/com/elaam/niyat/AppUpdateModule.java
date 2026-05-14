package com.elaam.niyat;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.Task;
import com.google.android.play.core.appupdate.AppUpdateInfo;
import com.google.android.play.core.appupdate.AppUpdateManager;
import com.google.android.play.core.appupdate.AppUpdateManagerFactory;
import com.google.android.play.core.appupdate.testing.FakeAppUpdateManager;
import com.google.android.play.core.install.model.AppUpdateType;
import com.google.android.play.core.install.model.UpdateAvailability;


@ReactModule(name = "AppUpdateModule")
public class AppUpdateModule extends  ReactContextBaseJavaModule{
    public static final String NAME = "AppUpdateModule";
    public  ReactApplicationContext mReactApplicationContext;


    AppUpdateModule(ReactApplicationContext ctx) {
        super(ctx);
        mReactApplicationContext = ctx;
    }

    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void checkForUpdate(Promise promise){

    //    FakeAppUpdateManager appUpdateManager = new FakeAppUpdateManager(mReactApplicationContext);
    //    appUpdateManager.setUpdateAvailable(4, AppUpdateType.IMMEDIATE);
    // For testing uncomment above 2 lines and comment 1 line below
        AppUpdateManager appUpdateManager = AppUpdateManagerFactory.create(mReactApplicationContext);

// Returns an intent object that you use to check for an update.
        Task<AppUpdateInfo> appUpdateInfoTask = appUpdateManager.getAppUpdateInfo();

// Checks that the platform will allow the specified type of update.
        appUpdateInfoTask.addOnSuccessListener(appUpdateInfo -> {
            Log.d("appUpdateInfo", appUpdateInfo.availableVersionCode() + "");

            if (appUpdateInfo.updateAvailability() == UpdateAvailability.UPDATE_AVAILABLE){
                promise.resolve(true);
//                promise.resolve(appUpdateInfo);
                    // This example applies an immediate update. To apply a flexible update
                    // instead, pass in AppUpdateType.FLEXIBLE
//                    && appUpdateInfo.isUpdateTypeAllowed(AppUpdateType.IMMEDIATE)) {
                // Request the update.
            } else {
                promise.reject(new Throwable("Not available"));
            }
        }).addOnFailureListener(e -> {
            Log.d("appUpdateInfo failure", e.toString());
            promise.reject(e);
        });

    }


}
