import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs'; 
import { Farm } from '../models/farm'

@Injectable()
export class loginService extends BaseService {
    private loginUrl = 'login/';

    constructor(private http: HttpClient) {
        super();
    }

    login(loginData): Observable<any> {
        return this.post(this.http, this.loginUrl, loginData);
    }


}