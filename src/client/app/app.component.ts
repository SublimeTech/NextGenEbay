import { Component, ViewContainerRef} from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';


import { LoginComponent } from './login.component';
import {ProductList} from './products-list.component'

@Component({
    selector: 'app-root',
    template: `
    <h1>{{title}}</h1>
    <nav class="navbar navbar-light bg-faded">
  <a class="navbar-brand" href="#">EbayNextGen</a>
  <ul class="nav navbar-nav">
    <li class="nav-item active">
      <a class="nav-link" href="#">Home<span class="sr-only">(current)</span></a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Features</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Pricing</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">About</a>
    </li>
  </ul>
</nav>
    <router-outlet></router-outlet>
  `,
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS
    ]
})
@RouteConfig([
    {
        path: '/login',
        name: 'Login',
        component: LoginComponent,
        useAsDefault: false
    },
    {
        path: '/',
        name: 'Home',
        component: ProductList,
        useAsDefault: true
    }
])
export class AppComponent {
    viewContainerRef: ViewContainerRef = null

    public constructor(viewContainerRef:ViewContainerRef) {
        // You need this small hack in order to catch application root view container ref
        this.viewContainerRef = viewContainerRef;
    }
}
