import { Component} from '@angular/core';
import { ProductService, Product } from './product.service'
import {HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import {CORE_DIRECTIVES} from '@angular/common';
import {AlertComponent} from 'ng2-bootstrap';
import { RouteParams, Router } from '@angular/router-deprecated';
import 'rxjs/Rx';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap';



@Component({
    selector: 'product-list',
    templateUrl: 'app/product-list.component.html',
    styleUrls: ['app/product-list.component.css'],
    providers: [ProductService, HTTP_PROVIDERS] ,
    directives: [AlertComponent, CORE_DIRECTIVES, MODAL_DIRECTVES],
    viewProviders:[BS_VIEW_PROVIDERS]
})


export class ProductList {
    vm = this;
    products: [Product];
    bidInput: number;

    constructor (private productService: ProductService) {

    }

    ngOnInit() {
        var vm = this.vm;
        this.productService.getProducts()
            .map(function(products: [Product]){
                vm.products = products
            })
            .subscribe();
    }

    makeBid(productId: number) {
        console.log('Making bid '+productId);
    }


}