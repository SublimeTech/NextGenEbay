import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable }  from 'rxjs/Observable'
import { RequestOptions } from '@angular/http';

export class User {
    constructor(id:string, username: string, created_at: string) {

    }
}

@Injectable()
export class LoginService {
    private baseURL = '/api/products'

    constructor(private http:Http) {
    }

    login(username: string, password: string): Observable<boolean> {
        console.log('Hola mama');
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/api/login', JSON.stringify({username: username, password: password}), options)
            .map(function(res){
                var jsonResp = res.json();
                if (jsonResp.error) {
                    console.error(jsonResp.error_msg);
                    return null;
                } else {
                    return jsonResp.user;
                }
            })
            .catch(function(err){
                return Observable.throw(false)
            })
    }

}
