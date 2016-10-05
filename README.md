# Angular2 Storage Sync

Angular2 decorator to sync properties automatically from/to LocalStorage or SessionStorage

## Use

1. `npm install --save angular2-storage-sync`
2. Use in your component:
```typescript
import { StorageSync, StorageStrategy } from 'angular2-storage-sync';
 export class AppComponent {
	@StorageSync('rememberMe') remember: boolean = false;
	@StorageSync(null, StorageStrategy.Session) items: Array<Object> = [];
 }
```

The @StorageSync expects two params:
1. Custom key - the default is the property name
2. StorageStrategy - Local or Session - default to LocalStorage

**Important**: 
Define always a default value at the property you are using `@StorageSync`.


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
    // this is always sync with your storage
    this.items = [{id: 1}, {id: 2}];
  }
}
``
