import { Component, ViewChild} from '@angular/core';
import { ProductService, Product, Bid } from './product.service'
import {HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import {CORE_DIRECTIVES} from '@angular/common';
import {AlertComponent} from 'ng2-bootstrap';
import { RouteParams, Router } from '@angular/router-deprecated';
import 'rxjs/Rx';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap';
import { Observable }  from 'rxjs/Observable'



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
    @ViewChild('smModal') modal;


    constructor (private productService: ProductService, private router: Router) {

    }

    ngOnInit() {
        var vm = this.vm;
        this.productService.getProducts()
            .map(function(products: [Product]){
                vm.products = products
            })
            .subscribe();
    }

    showModal() {
        this.modal.show()
    }

    makeBid(productId: number) {
        var vm = this.vm;
        console.log('Making bid '+productId);
        this.vm.productService.makeBid(productId, this.bidInput)
            .map(function(bid: Bid){
                if (bid != 1000){
                    console.log(bid);
                }
                else {
                    vm.modal.hide();
                    vm.modal.onHidden.subscribe(item=>vm.router.navigate(['Login']))
                }

            })
            .subscribe();
    }


}