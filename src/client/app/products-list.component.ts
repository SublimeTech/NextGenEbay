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
import {$WebSocket} from 'angular2-websocket/angular2-websocket'
import {LoginService, User} from './login.service'





@Component({
    selector: 'product-list',
    templateUrl: 'app/product-list.component.html',
    styleUrls: ['app/product-list.component.css'],
    providers: [ProductService, HTTP_PROVIDERS, LoginService] ,
    directives: [AlertComponent, CORE_DIRECTIVES, MODAL_DIRECTVES],
    viewProviders:[BS_VIEW_PROVIDERS]
})


export class ProductList {
    vm = this;
    products: [Product];
    bidInput: number;
    ws: $WebSocket;
    @ViewChild('smModal') modal;
    @ViewChild('bidSuperpassAlertModal') bidSuperPassAlertModal;


    constructor (private productService: ProductService, private router: Router, loginService: LoginService) {
        this.loginService = loginService
    }

    ngOnInit() {
        var vm = this.vm;
        this.productService.getProducts()
            .map(function(products: [Product]){
                vm.products = products;
                // if (!vm.ws) {
                    vm.ws = vm.productService.listenBids();
                    vm.ws.onMessage(function(message: string){
                        var obj = JSON.parse(message.data);

                        console.log(obj.bid.product_id);
                        var productId = obj.bid.product_id
                        var index = vm.products.findIndex((item: Product)=> item.id === productId);
                        if (vm.loginService.isLoggedIn()) {
                            var currentMaxBid = vm.products[index].maxBid;
                            if ((currentMaxBid && currentMaxBid.user_id == vm.loginService.getCurrentUser().id) && currentMaxBid.user_id != obj.bid.user_id) {
                                console.log('you bid was superpass')
                                vm.bidSuperPassAlertModal.show()
                            }
                        }
                        var product = vm.products[index]
                        product.maxBid = obj.bid
                    }, [])
                        .onError(function(error: string){
                            console.error(error);
                        })
                        .connect(true);
                // }
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