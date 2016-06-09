import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable }  from 'rxjs/Observable'
import { RequestOptions } from '@angular/http';

export class Product {
    constructor(public id: number, public title: string,
                public description: string, public created_at: string) {

    }
}

export class Bid {
    constructor(public id: number, productId: number, userId: number, amount: number) {

    }
}

@Injectable()
export class ProductService {
    private baseURL = '/api/products'

    constructor(private http:Http) {
    }

    getProducts(): Observable<[Product]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get('/api/products')
            .map(function(res){
                var jsonResp = res.json();
                console.log(jsonResp)
                if (jsonResp.error) {
                    return Observable.throw(false);
                } else {
                    return jsonResp.products
                }
            })
            .catch(function(err){
                return Observable.throw(false);
            })
    }

    makeBid(productId: number, amount: number): Observable<Bid> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/api/bid', JSON.stringify({product_id: productId, amount: amount}), options)
            .map(function(res){
                var jsonResp = res.json();
                console.log(jsonResp)
                console.log(jsonResp);
                if (jsonResp.error) {
                    console.log(jsonResp)
                    return jsonResp.error_code
                } else {
                    return jsonResp.bid
                }
            })
            .catch(function(err){
                console.log(err)
            })
    }
}
