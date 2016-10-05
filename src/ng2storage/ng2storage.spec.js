"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ng2storage_1 = require('./ng2storage');
var ng2storage_helpers_1 = require('./ng2storage.helpers');
var Ng2StorageTestLocalStorage = (function () {
    function Ng2StorageTestLocalStorage() {
        this.title = 'ng2storage works!';
        this.rememberMe = false;
        this.items = [];
        this.internalKey = '';
    }
    __decorate([
        ng2storage_1.StorageSync()
    ], Ng2StorageTestLocalStorage.prototype, "title");
    __decorate([
        ng2storage_1.StorageSync()
    ], Ng2StorageTestLocalStorage.prototype, "rememberMe");
    __decorate([
        ng2storage_1.StorageSync()
    ], Ng2StorageTestLocalStorage.prototype, "items");
    __decorate([
        ng2storage_1.StorageSync('outerKey')
    ], Ng2StorageTestLocalStorage.prototype, "internalKey");
    return Ng2StorageTestLocalStorage;
}());
describe('Ng2Storage', function () {
    var fixture;
    var storage;
    beforeEach(function () {
        fixture = new Ng2StorageTestLocalStorage();
    });
    describe('Local storage', function () {
        beforeEach(function () {
            storage = ng2storage_helpers_1.setStorage(localStorage, '');
        });
        it('should set the default value when the key does not exists in the local storage', function () {
            expect(storage.getItem('title')).toBe('ng2storage works!');
        });
        it('should set the new value to local storage', function () {
            fixture.title = 'set value to local storage';
            expect(storage.getItem('title')).toBe('set value to local storage');
        });
        it('should return boolean type as boolean', function () {
            fixture.rememberMe = true;
            expect(typeof storage.getItem('rememberMe')).toBe('boolean');
        });
        it('should return array type as array', function () {
            fixture.items = [{ id: 1 }, { id: 2 }];
            expect(Array.isArray(storage.getItem('items'))).toBe(true);
        });
        it('should set the custom key as storage key instead the default key if set', function () {
            fixture.internalKey = 'some value';
            expect(storage.getItem('internalKey')).toEqual(null);
            expect(storage.getItem('outerKey')).toEqual('some value');
        });
    });
});
var Ng2StorageTestSessionStorage = (function () {
    function Ng2StorageTestSessionStorage() {
        this.title = 'ng2storage works!';
        this.rememberMe = false;
        this.items = [];
        this.internalKey = '';
    }
    __decorate([
        ng2storage_1.StorageSync(null, ng2storage_1.StorageStrategy.Session)
    ], Ng2StorageTestSessionStorage.prototype, "title");
    __decorate([
        ng2storage_1.StorageSync(null, ng2storage_1.StorageStrategy.Session)
    ], Ng2StorageTestSessionStorage.prototype, "rememberMe");
    __decorate([
        ng2storage_1.StorageSync(null, ng2storage_1.StorageStrategy.Session)
    ], Ng2StorageTestSessionStorage.prototype, "items");
    __decorate([
        ng2storage_1.StorageSync('outerKey', ng2storage_1.StorageStrategy.Session)
    ], Ng2StorageTestSessionStorage.prototype, "internalKey");
    return Ng2StorageTestSessionStorage;
}());
describe('Ng2Storage', function () {
    var fixture;
    var storage;
    beforeEach(function () {
        fixture = new Ng2StorageTestSessionStorage();
    });
    describe('Session storage', function () {
        beforeEach(function () {
            storage = ng2storage_helpers_1.setStorage(sessionStorage, '');
        });
        it('should set the default value when the key does not exists in the local storage', function () {
            expect(storage.getItem('title')).toBe('ng2storage works!');
        });
        it('should set the new value to local storage', function () {
            fixture.title = 'set value to local storage';
            expect(storage.getItem('title')).toBe('set value to local storage');
        });
        it('should return boolean type as boolean', function () {
            fixture.rememberMe = true;
            expect(typeof storage.getItem('rememberMe')).toBe('boolean');
        });
        it('should return array type as array', function () {
            fixture.items = [{ id: 1 }, { id: 2 }];
            expect(Array.isArray(storage.getItem('items'))).toBe(true);
        });
        it('should set the custom key as storage key instead the default key if set', function () {
            fixture.internalKey = 'some value';
            expect(storage.getItem('internalKey')).toEqual(null);
            expect(storage.getItem('outerKey')).toEqual('some value');
        });
    });
});
