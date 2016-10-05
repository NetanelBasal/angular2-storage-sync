import { Component } from '@angular/core';
import { StorageSync, StorageStrategy } from '../ng2storage/ng2storage';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @StorageSync('rememberMe') remember: boolean = false;
  @StorageSync(null, StorageStrategy.Session) items: Array<Object> = [];

  constructor() {
  }

  setItems() {
    this.items = [{id: 1}, {id: 2}];
  }
}
