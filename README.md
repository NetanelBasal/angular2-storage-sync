# Angular2 Storage Sync

The Angular2 Storage Sync is an Angular2 decorator to sync properties automatically from/to LocalStorage or SessionStorage.

## Use

1. `cd` to the root of your app and run `npm install --save angular2-storage-sync`
OR add `"angular2-storage-sync": "^0.1.0"` to your package.json file and then `cd` to the root of your app and run `npm install`

2. Use in your component or service:
```typescript
import { StorageSync, StorageStrategy } from 'angular2-storage-sync';

export class AppComponent {
 @StorageSync('rememberMe') remember: boolean = false;
 @StorageSync(null, StorageStrategy.Session) items: Array<Object> = [];
}
```

### The @StorageSync decorator expects two params:
1. Custom key - the default is the property name.
2. StorageStrategy - Local or Session - defaults to LocalStorage.

**Important**: 
Always define a default value for the properties you are using in the `@StorageSync` lines.


## Example

```javascript
@Component({
  selector: 'storage-app',
  template: 
    <input type="checkbox"  [(ngModel)]="remember"> Remember me
    <button (click)="setItems()">Set items</button>
    <ul>
      <li *ngFor="let item of items">
       {{item.id}}
      </li>
    </ul>
})

export class AppComponent {
  @StorageSync('rememberMe') remember: boolean = false;
  
  @StorageSync(null, StorageStrategy.Session) items: Array<Object> = [];

  setItems() {
    // To store data, set this.items (the variable of type Array<Object> in your @StorageSync call)
    //equal to whatever you want to store in local storage.
    this.items = [{id: 1}, {id: 2}];
  }
}
``
