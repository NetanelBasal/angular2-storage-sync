import {IStorage} from './ng2storage';

/**
 *
 * @param val
 * @returns {any}
 * @private
 */
function _serialize( val ) {
  if( typeof val === 'string' ) {
    return val;
  }
  // for objects and booleans
  try {
    return JSON.stringify(val);
  } catch( e ) {
    return val;
  }
}

/**
 *
 * @param val
 * @returns {any}
 * @private
 */
function _deserialize( val ) {
  try {
    return JSON.parse(val);
  } catch( e ) {
    return val;
  }
}

/**
 *
 * @param storageStrategy
 * @param originalVal
 * @returns {any}
 */
export function setStorage( storageStrategy : IStorage, originalVal : any ) : IStorage {
  return {
    getItem( key : string ) {
      try {
        return _deserialize(storageStrategy.getItem(key));
      } catch( e ) {
        console.warn('Storage not supported');
        return originalVal;
      }
    },
    setItem( key : string, newVal : any ) {
      try {
        storageStrategy.setItem(key, _serialize(newVal));
      } catch( e ) {
        console.warn('Storage not supported');
      }
    }
  }
}
