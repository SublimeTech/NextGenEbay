import { Component} from '@angular/core';
import { LoginService, User } from './login.service'
import {HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import {CORE_DIRECTIVES} from '@angular/common';
import {AlertComponent} from 'ng2-bootstrap';
import { RouteParams, Router } from '@angular/router-deprecated';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap';



@Component({
    selector: 'register',
    templateUrl: 'app/register.component.html',
    styleUrls: ['app/login.component.css'],
    providers: [LoginService, HTTP_PROVIDERS],
    directives: [AlertComponent, CORE_DIRECTIVES, MODAL_DIRECTVES],
    viewProviders:[BS_VIEW_PROVIDERS]
})


export class RegisterComponent {
    vm = this;
    username  = "";
    password = "";
    loginError = "";

    constructor (private loginService: LoginService, private router: Router) {

    }

    ngOnInit() {
    }

    onSubmit() {
        this.login();
    };

    login() {
        var vm = this.vm;
        vm.loginService.register(vm.username, vm.password)
            .map(function(data: boolean){
                if (data == true) {
                    vm.router.navigate(['Login'])
                }
            })
            .subscribe();
    }
}