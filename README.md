Replace all retriever.release(); in
@react-native-community/cameraroll/android/src/main/java/com/reactnativecommunity/cameraroll/CameraRollModule.java

line no 650 and 717

try {
retriever.release();
} catch (IOException ex) {
// handle the exception here
}

---

a/node_modules/axios/lib/defaults/index.js b/node_modules/axios/lib/defaults/index.js

```javascript
function getDefaultAdapter() {
-  var adapter;
-  if (typeof XMLHttpRequest !== 'undefined') {
-    // For browsers use XHR adapter
-    adapter = require('../adapters/xhr');
-  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
-    // For node use HTTP adapter
-    adapter = require('../adapters/http');
-  }
-  return adapter;
+  return require('@vespaiach/axios-fetch-adapter').default
 }
```
# elaam_app_mobile
