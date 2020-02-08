import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs'; 
import { Quarter } from '../models/quarter'

@Injectable()
export class QuarterService extends BaseService {
    private quarter_base_url = 'quarter/';
    private quarter_base_url_user = 'user/quarters/';
    private user;
    private id_user;

    constructor(private http: HttpClient) {
        super();
        this.getUser();
    }

    createQuarter(quarter_data: Quarter): Observable<any> {
        let quarter_create_url = this.quarter_base_url + 'store'
        return this.post(this.http, quarter_create_url, quarter_data);
    }

    getQuarters(): Observable <any> {
        let get_all_quarters_url = this.quarter_base_url_user + this.id_user
        return this.get(this.http, get_all_quarters_url);
    }

    deleteQuarter(quarter_id): Observable <any> {
        let delete_quarter_url = this.quarter_base_url + `delete/${quarter_id}`
        return this.delete(this.http, delete_quarter_url);

    }

    getQuarter(id): Observable <any> {
        let get_all_quarters_url = this.quarter_base_url + `${id}`
        return this.get(this.http, get_all_quarters_url);
    }

    updateQuarter(id, quarter_data: Quarter): Observable <any> {
        let get_all_quarters_url = this.quarter_base_url + `update/${id}`
        return this.post(this.http, get_all_quarters_url, quarter_data);
    }

    getUser(){
        this.user = JSON.parse(localStorage.getItem('user'));
        this.id_user=this.user['user'].id;
    }

}