import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs'; 
import { Season } from '../models/season'

@Injectable()
export class SeasonService extends BaseService {
    private season_base_url = 'season/';

    constructor(private http: HttpClient) {
        super();
    }

    createSeason(season_data: Season): Observable<any> {
        let season_create_url = this.season_base_url + 'store'
        return this.post(this.http, season_create_url, season_data);
    }

    getSeasons(): Observable <any> {
        let get_all_seasons_url = this.season_base_url + 'all'
        return this.get(this.http, get_all_seasons_url);
    }

    deleteSeason(season_id): Observable <any> {
        let delete_season_url = this.season_base_url + `delete/${season_id}`
        return this.delete(this.http, delete_season_url);

    }

    getSeason(id): Observable <any> {
        let get_all_seasons_url = this.season_base_url + `${id}`
        return this.get(this.http, get_all_seasons_url);
    }

    updateSeason(id, season_data: Season): Observable <any> {
        let get_all_seasons_url = this.season_base_url + `update/${id}`
        return this.post(this.http, get_all_seasons_url, season_data);
    }

}