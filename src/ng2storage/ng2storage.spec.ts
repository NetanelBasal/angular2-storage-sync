import { StorageSync, IStorage, StorageStrategy } from './ng2storage';
import { setStorage } from './ng2storage.helpers';

class Ng2StorageTestLocalStorage {
  @StorageSync() title : string = 'ng2storage works!';
  @StorageSync() rememberMe : boolean = false;
  @StorageSync() items : Array<Object> = [];
  @StorageSync('outerKey') internalKey = '';
}

describe('Ng2Storage', () => {
  let fixture : Ng2StorageTestLocalStorage;
  let storage : IStorage;

  beforeEach(() => {
    fixture = new Ng2StorageTestLocalStorage();
  });

  describe('Local storage', () => {

    beforeEach(() => {
      storage = setStorage(localStorage, '');
    });

    it('should set the default value when the key does not exists in the local storage', () => {
      expect(storage.getItem('title')).toBe('ng2storage works!');
    });

    it('should set the new value to local storage', () => {
      fixture.title = 'set value to local storage';
      expect(storage.getItem('title')).toBe('set value to local storage');
    });

    it('should return boolean type as boolean', () => {
      fixture.rememberMe = true;
      expect(typeof storage.getItem('rememberMe')).toBe('boolean');
    });

    it('should return array type as array', () => {
      fixture.items = [{id: 1}, {id: 2}];
      expect(Array.isArray(storage.getItem('items'))).toBe(true);
    });

    it('should set the custom key as storage key instead the default key if set', () => {
      fixture.internalKey = 'some value';
      expect(storage.getItem('internalKey')).toEqual(null);
      expect(storage.getItem('outerKey')).toEqual('some value');
    });

  });

});

class Ng2StorageTestSessionStorage {
  @StorageSync(null, StorageStrategy.Session) title : string = 'ng2storage works!';
  @StorageSync(null, StorageStrategy.Session) rememberMe : boolean = false;
  @StorageSync(null, StorageStrategy.Session) items : Array<Object> = [];
  @StorageSync('outerKey', StorageStrategy.Session) internalKey = '';
}

describe('Ng2Storage', () => {
  let fixture : Ng2StorageTestSessionStorage;
  let storage : IStorage;

  beforeEach(() => {
    fixture = new Ng2StorageTestSessionStorage();
  });

  describe('Session storage', () => {

    beforeEach(() => {
      storage = setStorage(sessionStorage, '');
    });

    it('should set the default value when the key does not exists in the local storage', () => {
      expect(storage.getItem('title')).toBe('ng2storage works!');
    });

    it('should set the new value to local storage', () => {
      fixture.title = 'set value to local storage';
      expect(storage.getItem('title')).toBe('set value to local storage');
    });

    it('should return boolean type as boolean', () => {
      fixture.rememberMe = true;
      expect(typeof storage.getItem('rememberMe')).toBe('boolean');
    });

    it('should return array type as array', () => {
      fixture.items = [{id: 1}, {id: 2}];
      expect(Array.isArray(storage.getItem('items'))).toBe(true);
    });

    it('should set the custom key as storage key instead the default key if set', () => {
      fixture.internalKey = 'some value';
      expect(storage.getItem('internalKey')).toEqual(null);
      expect(storage.getItem('outerKey')).toEqual('some value');
    });

  });

});
