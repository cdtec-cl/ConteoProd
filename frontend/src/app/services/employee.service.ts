import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs'; 
import { Employee } from '../models/employee'

@Injectable()
export class EmployeeService extends BaseService {
    private employee_base_url = 'employee/';

    constructor(private http: HttpClient) {
        super();
    }

    createEmployee(employee_data: Employee,seasonsSelected:Array<any>): Observable<any> {
        let employee_create_url = this.employee_base_url + 'store'

        return this.post(this.http, employee_create_url,{
            employee_data,
            seasonsSelected
        });
    }

    getEmployees(): Observable <any> {
        let get_all_employee_url = this.employee_base_url + 'all'
        return this.get(this.http, get_all_employee_url);
    }

    deleteEmployee(employee_id): Observable <any> {
        let delete_employee_url = this.employee_base_url + `delete/${employee_id}`
        return this.delete(this.http, delete_employee_url);

    }

    getEmployee(id): Observable <any> {
        let get_all_employee_url = this.employee_base_url + `${id}`
        return this.get(this.http, get_all_employee_url);
    }

    getSeasonsSelected(id): Observable <any> {
        let get_all_employee_url = this.employee_base_url + `seasons/${id}`
        return this.get(this.http, get_all_employee_url);
    }

    updateEmployee(id, employee_data: Employee,seasonsSelected:Array<any>): Observable <any> {
        let get_all_employee_url = this.employee_base_url + `update/${id}`
        return this.post(this.http, get_all_employee_url, {
            employee_data,
            seasonsSelected
        });
    }

}