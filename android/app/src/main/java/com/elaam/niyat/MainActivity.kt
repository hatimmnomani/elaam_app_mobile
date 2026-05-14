package com.elaam.niyat
import android.os.Bundle
import android.util.Log

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate


class MainActivity : ReactActivity() {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
//  @Override
//  protected String getMainComponentName() {
//
//    return "ELAAM";
//  }
    override fun getMainComponentName(): String = "ELAAM"



    /**
     * (aka React 18) with two boolean flags.	   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
     * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)


    /* react-native-screens package requires one additional configuration
     *step to properly work on Android
     *devices.
     */
//  @Override
//protected void onCreate(Bundle savedInstanceState) {
//  super.onCreate(null);
//}
//
//  @Override
//  protected void onPause() {
//    super.onPause();
//    Log.d("TAG", "onPause: ");
//  }
//
//  @Override
//  protected void onStop() {
//    super.onStop();
//    Log.d("TAG", "onStop: ");
//  }
}
