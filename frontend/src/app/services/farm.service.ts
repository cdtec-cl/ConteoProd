import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs'; 
import { Farm } from '../models/farm'

@Injectable()
export class FarmService extends BaseService {
    private farm_base_url = 'farm/';
    private farm_base_url_user = 'user/farms/';
    private user;
    private id_user;

    constructor(private http: HttpClient) {
        super();
        this.getUser();

    }
    getFarmsByUserAuth(): Observable <any> {
        let get_all_farms_url = this.farm_base_url + 'all'
        return this.get(this.http, get_all_farms_url);
    }
    createFarm(farm_data: Farm): Observable<any> {
        let farm_create_url = this.farm_base_url + 'store'
        return this.post(this.http, farm_create_url, farm_data);
    }

    getFarms(): Observable <any> {
        let get_all_farms_url = this.farm_base_url_user + this.id_user
        console.log(get_all_farms_url);        
        return this.get(this.http, get_all_farms_url);
    }

    deleteFarm(farm_id): Observable <any> {
        let delete_farm_url = this.farm_base_url + `delete/${farm_id}`
        return this.delete(this.http, delete_farm_url);

    }

    getFarm(id): Observable <any> {
        let get_all_farms_url = this.farm_base_url + `${id}`
        return this.get(this.http, get_all_farms_url);
    }

    updateFarm(id, farm_data: Farm): Observable <any> {
        let get_all_farms_url = this.farm_base_url + `update/${id}`
        return this.post(this.http, get_all_farms_url, farm_data);
    }

    getUser(){
        this.user = JSON.parse(localStorage.getItem('user'));
        this.id_user=this.user['user'].id;
    }

}
