import { Component, ViewContainerRef} from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {LoginService, User} from './login.service'

import { LoginComponent } from './login.component';
import {ProductList} from './products-list.component'
import {HTTP_PROVIDERS} from '@angular/http';
import { RouteParams, Router } from '@angular/router-deprecated';

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
      <a class="nav-link" href="#">About</a>
    </li>
    
    <li class="nav-item" *ngIf="!vm.loginService.isLoggedIn()">
      <a class="nav-link" href="#" [routerLink]="['Login']">Login</a>
    </li>
    
    <li *ngIf="vm.loginService.isLoggedIn()" class="nav-item">
    <a class="nav-link" href="#" (click)="vm.logout()">Logout</a>
    </li>
  </ul>
  <div class="pull-sm-right" *ngIf="vm.loginService.isLoggedIn() && vm.loginService.getCurrentUser() != null">Hello {{vm.loginService.getCurrentUser().username}}</div>
</nav>
    <router-outlet></router-outlet>
  `,
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS, LoginService, HTTP_PROVIDERS
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
    viewContainerRef: ViewContainerRef = null;
    vm = this;

    public constructor(viewContainerRef:ViewContainerRef, loginService: LoginService, private router: Router) {
        this.loginService = loginService;
        // You need this small hack in order to catch application root view container ref
        this.viewContainerRef = viewContainerRef;
    }

    logout() {
        var vm = this.vm;
        this.loginService.logout()
            .map(data=> vm.router.navigate(['Home']))
            .subscribe()
    }
}
