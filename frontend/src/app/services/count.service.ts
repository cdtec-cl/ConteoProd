import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs'; 
import { Count } from '../models/count'

@Injectable()
export class CountService extends BaseService {
    private count_base_url = 'count/';
    private user;
    private id_user;

    constructor(private http: HttpClient) {
        super();
        this.getUser();
    }

    createCount(count_data: Count): Observable<any> {
        let count_create_url = this.count_base_url + 'store'
        return this.post(this.http, count_create_url, count_data);
    }

    getCounts(): Observable <any> {
        let get_all_counts_url = this.count_base_url + 'all'
        return this.get(this.http, get_all_counts_url);
    }

    getCountsDashboard(farm, quearter,season): Observable <any> {
        let get_all_counts_url = this.count_base_url + 'allcount?'+'farm='+farm+"&quarters="+quearter+"&season="+season+"&user_id="+this.id_user;
        return this.get(this.http, get_all_counts_url);
    }

    deleteCount(count_id): Observable <any> {
        let delete_count_url = this.count_base_url + `delete/${count_id}`
        return this.delete(this.http, delete_count_url);

    }

    getCount(id): Observable <any> {
        let get_all_counts_url = this.count_base_url + `${id}`
        return this.get(this.http, get_all_counts_url);
    }

    updateCount(id, count_data: Count): Observable <any> {
        let get_all_counts_url = this.count_base_url + `update/${id}`
        return this.post(this.http, get_all_counts_url, count_data);
    }
    getImportDates(){
       let get_import_dates = this.count_base_url + `getimportdates`
        return this.get(this.http, get_import_dates); 
    }
    getRecordsPerBatch(date:any){
        let get_records_per_batch = this.count_base_url + `getrecordsperbatch`
        return this.post(this.http,get_records_per_batch,date);
    }
    deleteRecordsPerBatch(ids:any){
        let delete_records_per_batch = this.count_base_url + `deleterecordsperbatch`
        return this.post(this.http,delete_records_per_batch,ids);
    }

    getUser(){
        this.user = JSON.parse(localStorage.getItem('user'));
        this.id_user=this.user['user'].id;
    }
}