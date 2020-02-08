import { Component, OnInit , Input , Output, EventEmitter} from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { SeasonService } from 'src/app/services/season.service';
// elements
import {
  seasonConfigObj,
} from "./selectsconfigs/configs";

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employee = null;
  buttonMessage = '';
  @Input() param: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  seasons: Array<any> = [];
  seasonConfig = seasonConfigObj;
  seasonsSelected: Array<any> = [];
  selectedDatasource: Array<any> = [];
  constructor(private employee_service: EmployeeService, 
      private season_service: SeasonService, 
      private router: Router, 
      private notification_service: NotificationService,
      private spinner_service: SpinnerService) { }

  ngOnInit() {
  	this.spinner_service.show();
    this.getSeasons();
    this.employee = new Employee();
    this.employee.active=true;
    switch (this.param.key) {
      case "id":
        if(this.param.value) {
          this.spinner_service.close()
          this.employee_service.getEmployee(this.param.value).toPromise().then(
            response => {
              this.employee = response.employee;
              this.employee_service.getSeasonsSelected(this.employee.id).toPromise().then(
                response => {
                  for (var i = 0; i < response.seasons.length; i++) {
                    this.selectedDatasource=[...this.selectedDatasource,this.seasons.filter(element => element.id == response.seasons[i].id_season)[0]];
                  }
                })
            })
        } else {
          setTimeout(() => { this.spinner_service.close(); }, 500);
        }
        this.buttonMessage = this.param.value ? 'Actualizar Empleado': 'Agregar Empleado'
        break;
      case "rut":
        if(this.param.value) {
          this.spinner_service.close()
          this.employee.rut=(this.param.value).toString();
        } else {
          setTimeout(() => { this.spinner_service.close(); }, 500);
        }
        this.buttonMessage = 'Agregar Empleado';
        break;
      default:
      // code...
      break;
    }
  }
  getSeasons(){
    this.seasons=[];
    this.season_service.getSeasons().toPromise().then(
      response => {
        this.spinner_service.close()
        for (var i = 0; i < response.seasons.length; i++) {
          this.seasons = [...this.seasons, {id:response.seasons[i].id,name:response.seasons[i].name}];
        }
      }
    ).catch( 
      error => {
        this.spinner_service.close()
        this.notification_service.showError('Error',error.error)
      }
    );
  }
  selectionChanged(event){
    this.seasonsSelected=event.value;
  }
  saveEmployee(){
    this.seasonsSelected= this.seasonsSelected.length>0?this.seasonsSelected.map(({id}) => id):[];
    this.spinner_service.show()
    if(this.employee.id){
      this.employee_service.updateEmployee(this.employee.id, this.employee,this.seasonsSelected).toPromise().then(
        response => {
          this.spinner_service.close()
          this.notification_service.showSuccess('Operación Exitosa', response.message);
          this.router.navigate(['../tables-empleados']);     
        }
      ).catch(
        error => {
          this.spinner_service.close()
          this.notification_service.showError('Error',error.error)
        }
      );      
    } 
    else{
      this.employee_service.createEmployee(this.employee,this.seasonsSelected).toPromise().then(
        response => {
          this.spinner_service.close()
          this.notification_service.showSuccess('Operación Exitosa', response.message);
          switch (this.param.key) {
            case "id":
              this.router.navigate(['../tables-empleados']);
              break;
            case "rut":
              this.passEntry.emit(response.employee.id);
              break;
            default:
              break;
          }
        }
      ).catch(
        error => {
          this.spinner_service.close()
          this.notification_service.showError('Error',error.error)    
        }
      );      
    }

  }
  toggleSelection(event){
    this.employee.active = !this.employee.active;
  }
}
