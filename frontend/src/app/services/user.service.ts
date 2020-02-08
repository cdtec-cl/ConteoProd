import { HttpClient  } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs'; 
import { User } from '../models/user'

@Injectable()
export class UserService extends BaseService {
    private user_base_url = 'user/';

    constructor(private http: HttpClient) {
        super();
    }
    

    createUser(user_data: User,farmsSelected:Array<any>): Observable<any> {
        let user_create_url = this.user_base_url + 'store'
        return this.post(this.http, user_create_url, {
            user_data,
            farmsSelected
        });
    }

    getUsers(): Observable <any> {
        let get_all_users_url = this.user_base_url + 'all'
        return this.get(this.http,get_all_users_url);
    }

    deleteUser(user_id): Observable <any> {
        let delete_user_url = this.user_base_url + `delete/${user_id}`
        return this.delete(this.http, delete_user_url);

    }

    getUser(id): Observable <any> {
        let get_users_url = this.user_base_url + `${id}`
        return this.get(this.http, get_users_url);
    }

    updateUser(id, user_data: User,farmsSelected:Array<any>): Observable <any> {
        let update_user_url = this.user_base_url + `update/${id}`
        return this.post(this.http, update_user_url, {
            user_data,
            farmsSelected
        });
    }

    getRoles(): Observable <any> {
        let get_all_roles = this.user_base_url + `roles`
        return this.get(this.http, get_all_roles);
    }

    getFarmsSelected(id): Observable <any> {
        let get_farms_url = this.user_base_url + `farms/${id}`
        return this.get(this.http, get_farms_url);
    }
}