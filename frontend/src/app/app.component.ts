import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavigationMenuComponent],
  template: `
    <app-navigation-menu></app-navigation-menu>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent { }
