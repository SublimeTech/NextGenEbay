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
    user = null;

    constructor(private http:Http) {
    }

    ngOnInit() {
        var storageUser = localStorage.getItem("currentUser");
        if (storageUser && this.isLoggedIn()) {
            this.user = JSON.parse(storageUser)
        }
    }

    login(username: string, password: string): Observable<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/api/login', JSON.stringify({username: username, password: password}), options)
            .map(function(res){
                var jsonResp = res.json();
                if (jsonResp.error) {
                    console.error(jsonResp.error_msg);
                    localStorage.removeItem('is_logged_in');
                    localStorage.removeItem('currentUser');
                    this.user = null
                    return null;
                } else {
                    localStorage.setItem('is_logged_in', true);
                    this.user = jsonResp.user;
                    localStorage.setItem('currentUser', JSON.stringify(jsonResp.user));
                    return jsonResp.user;
                }
            })
            .catch(function(err){
                return Observable.throw(false)
            })
    }

    isLoggedIn() {
        if (!localStorage.getItem('is_logged_in')) {
            return false;
        } else {
            return true;
        }
    }

    logout() {
        return this.http.get('/api/logout')
            .map(function(res){
                console.log(res);
                localStorage.removeItem('is_logged_in');
                localStorage.removeItem('currentUser');
            })
            .catch(function(err){
                return Observable.throw(false)
            })
    }

    getCurrentUser() {
        var storageUser = localStorage.getItem("currentUser");
        if (storageUser && this.isLoggedIn()) {
            return JSON.parse(storageUser)
        } else {
            return null;
        }
    }

}
