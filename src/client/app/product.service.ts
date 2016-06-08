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
}
