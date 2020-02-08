import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs'; 

@Injectable()
export class GuardService extends BaseService {
    private authUrl = 'auth/';
    constructor(private http: HttpClient) {
        super();
    }
   	isLoggedIn() {
	    return !!this.getJwtToken();
	}
	getJwtToken() {
	    return localStorage.getItem("access_token");
	}
	isAuthUser():any{
		this.getAuthUser()
			.toPromise()
			.then(response => {return true;})
			.catch(error => {return false;});
	}
	getAuthUser() : Observable <any> {
		let get_user_auth_url = this.authUrl + 'user'
        return this.get(this.http, get_user_auth_url);
	}
}

