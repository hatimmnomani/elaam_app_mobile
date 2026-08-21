# Ruby removed 'kconv' from the stdlib default gems in 3.4+. CFPropertyList
# (a CocoaPods dependency) still does `require 'kconv'` but never calls into
# it, so this shim just needs to exist to satisfy the require.
