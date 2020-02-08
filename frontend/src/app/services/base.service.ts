import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

export class BaseService {
  public base_url: string;
  constructor() {
    this.base_url = environment.base_url;
  }
  get token(): string {
      return localStorage.getItem("access_token");
  }
  getHttpHeaders(){
    if(this.token){      
      return new HttpHeaders({
        "Content-Type": "application/json",
        "accept": "application/json",        
        Authorization: `Bearer ${this.token}`
      });
    }else{
      return new HttpHeaders({
        "Content-Type": "application/json",   
        "accept": "application/json",
      });
    }
  }
  get(http: HttpClient, service_url: string): Observable<any> {
    const config = { headers: this.getHttpHeaders()};
    return http.get(environment.production?this.base_url + service_url:'api/'+service_url,  config);
  }

  post(http: HttpClient, service_url: string, request: any): Observable<any> {
    const config = { headers: this.getHttpHeaders()};   
    return http.post(environment.production?this.base_url + service_url:'api/'+service_url, request, config);
  }

  delete(http: HttpClient, service_url: string): Observable<any> {
    const config = { headers: this.getHttpHeaders()};
    return http.delete(environment.production?this.base_url + service_url:'api/'+service_url, config);
  }

}