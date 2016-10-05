import { setStorage } from './ng2storage.helpers';

export enum StorageStrategy {
  Local,
  Session
}

export interface IStorage {
  getItem : ( key : string ) => string;
  setItem : ( key : string, val : any ) => void;
  [key : string] : any
}

export function StorageSync( param : string = '', storageStrategy : StorageStrategy = StorageStrategy.Local ) {

  let storageKey : string = param;

  return function decorate( target : any, key : string ) {
    let _instanceKey = key;
    let _storage : IStorage;
    let _val = target[_instanceKey];
    let initialized : boolean = true;

    // if user does not set storage key use the default instance key as the storage key
    if( !storageKey ) {
      storageKey = _instanceKey;
    }

    // set the _storageStrategy
    if( storageStrategy === StorageStrategy.Local ) {
      _storage = setStorage(localStorage, _val);
    } else if( storageStrategy === StorageStrategy.Session ) {
      _storage = setStorage(sessionStorage, _val);
    }

    /**
     * property getter
     * @returns {any}
     */
    const getter = () => {
      if( _storage.getItem(storageKey) ) {
        return _storage.getItem(storageKey);
      }
      return _val;
    };

    /**
     * property setter
     * @param newVal
     */
    const setter = ( newVal ) => {
      // check if is the setter first time
      if( initialized ) {
        // if yes check if we already have the value in the storage for skipping the setter
        if( _storage.getItem(storageKey) ) {
          _val = _storage.getItem(storageKey);
          initialized = false;
        } else {
          // else save to storage and set the value
          _storage.setItem(storageKey, newVal);
          _val = newVal;
          initialized = false;
        }
      } else {
        // if not the first time save to storage and set the value
        _storage.setItem(storageKey, newVal);
        _val = newVal;
      }

    };

    // Delete property. The delete operator throws
    // in strict mode if the property is an own
    // non-configurable property and returns
    // false in non-strict mode.
    if( delete target[key] ) {
      Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
      });
    }

  }
}


