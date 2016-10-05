"use strict";
var ng2storage_helpers_1 = require('./ng2storage.helpers');
(function (StorageStrategy) {
    StorageStrategy[StorageStrategy["Local"] = 0] = "Local";
    StorageStrategy[StorageStrategy["Session"] = 1] = "Session";
})(exports.StorageStrategy || (exports.StorageStrategy = {}));
var StorageStrategy = exports.StorageStrategy;
function StorageSync(param, storageStrategy) {
    if (param === void 0) { param = ''; }
    if (storageStrategy === void 0) { storageStrategy = StorageStrategy.Local; }
    var storageKey = param;
    return function decorate(target, key) {
        var _instanceKey = key;
        var _storage;
        var _val = target[_instanceKey];
        var initialized = true;
        // if user does not set storage key use the default instance key as the storage key
        if (!storageKey) {
            storageKey = _instanceKey;
        }
        // set the _storageStrategy
        if (storageStrategy === StorageStrategy.Local) {
            _storage = ng2storage_helpers_1.setStorage(localStorage, _val);
        }
        else if (storageStrategy === StorageStrategy.Session) {
            _storage = ng2storage_helpers_1.setStorage(sessionStorage, _val);
        }
        /**
         * property getter
         * @returns {any}
         */
        var getter = function () {
            if (_storage.getItem(storageKey)) {
                return _storage.getItem(storageKey);
            }
            return _val;
        };
        /**
         * property setter
         * @param newVal
         */
        var setter = function (newVal) {
            // check if is the setter first time
            if (initialized) {
                // if yes check if we already have the value in the storage for skipping the setter
                if (_storage.getItem(storageKey)) {
                    _val = _storage.getItem(storageKey);
                    initialized = false;
                }
                else {
                    // else save to storage and set the value
                    _storage.setItem(storageKey, newVal);
                    _val = newVal;
                    initialized = false;
                }
            }
            else {
                // if not the first time save to storage and set the value
                _storage.setItem(storageKey, newVal);
                _val = newVal;
            }
        };
        // Delete property. The delete operator throws
        // in strict mode if the property is an own
        // non-configurable property and returns
        // false in non-strict mode.
        if (delete target[key]) {
            Object.defineProperty(target, key, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        }
    };
}
exports.StorageSync = StorageSync;
