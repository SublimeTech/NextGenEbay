import { Component} from '@angular/core';
import { ProductService } from './product.service'
import {HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import {CORE_DIRECTIVES} from '@angular/common';
import {AlertComponent} from 'ng2-bootstrap';
import { RouteParams, Router } from '@angular/router-deprecated';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap';



@Component({
    selector: 'new-product',
    templateUrl: 'app/new-product.component.html',
    styleUrls: ['app/login.component.css'],
    providers: [ProductService, HTTP_PROVIDERS],
    directives: [AlertComponent, CORE_DIRECTIVES, MODAL_DIRECTVES],
    viewProviders:[BS_VIEW_PROVIDERS]
})


export class NewProductComponent {
    vm = this;
    title  = "";
    description = "";
    imageUrl = "";
    loginError = "";

    constructor (private productService: ProductService, private router: Router) {

    }

    ngOnInit() {
    }

    onSubmit() {
        this.login();
    };

    login() {
        var vm = this.vm;
        vm.productService.createProduct(vm.title, vm.description, vm.imageUrl)
            .map(function(data: boolean){
                if (data == true) {
                    vm.router.navigate(['Home'])
                }
            })
            .subscribe();
    }
}