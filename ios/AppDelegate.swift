//
//  AppDelegate.swift
//  ELAAM
//
//  Created by Rajesh  Prasad on 25/09/25.
//

import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import Foundation
import Security
import Firebase

/// Deletes all Keychain items accessible by this app if this is the first time the user launches the app
func clearKeychainIfNecessary() {
    let hasRunBeforeKey = "HAS_RUN_BEFORE"
    let defaults = UserDefaults.standard

    // Check whether this is the first time the app is run
    if !defaults.bool(forKey: hasRunBeforeKey) {
        // Mark that the app has been launched before
        defaults.set(true, forKey: hasRunBeforeKey)
        defaults.synchronize() // ensure it's saved immediately

        let secItemClasses: [CFString] = [
            kSecClassGenericPassword,
            kSecClassInternetPassword,
            kSecClassCertificate,
            kSecClassKey,
            kSecClassIdentity
        ]

        // Iterate through all Keychain classes and delete all items
        for itemClass in secItemClasses {
            let query: [String: Any] = [kSecClass as String: itemClass]
            SecItemDelete(query as CFDictionary)
        }

        print("✅ Keychain cleared on first launch.")
    } else {
        print("ℹ️ App has run before. Keychain not cleared.")
    }
}

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    FirebaseApp.configure()
    // Clear keychain on first launch
            clearKeychainIfNecessary()
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "AELAAM",
      in: window,
      launchOptions: launchOptions
    )

    return true
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
