import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public menus = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Players', url: '/players', icon: 'body' },
    { title: 'Games', url: '/games', icon: 'game-controller' },
    { title: 'Runs', url: '/runs', icon: 'rocket' },
  ];
  constructor() {}
}
