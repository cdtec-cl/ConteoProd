import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-tables-employee',
  templateUrl: './tables-employee.component.html',
  styleUrls: ['./tables-employee.component.scss']
})
export class TablesEmployeeComponent implements OnInit {

  public employees = [];
  buttonMessage = 'Nuevo Empleado';
  buttonIcon = 'ni ni-fat-add';
  page = 1

  constructor(
    private employee_service: EmployeeService, 
    private router: Router,
    private notification_service: NotificationService,
    private spinner_service: SpinnerService
  ) { }

  ngOnInit() {
    this.spinner_service.show()
    this.employee_service.getEmployees().toPromise().then(
      response => {
        this.spinner_service.close()
        this.employees = response.empleados
      }
    ).catch( 
      error => {
        this.spinner_service.close()
        this.notification_service.showError('Error',error.error)
      }
    )
  }

  toEdit(id){
    this.router.navigate([`/form-empleado/${id}`])
  }

  detail(){

  }

  delete(id){
    this.spinner_service.show()
    this.employee_service.deleteEmployee(id).toPromise().then(
      response => {
        this.spinner_service.close()
        this.employees = this.employees.filter(employee_from_list => employee_from_list.id !== id)
        this.notification_service.showSuccess('Operación Exitosa', response.message)
      }
    ).catch(
      error =>{
        this.spinner_service.close()
        this.notification_service.showError('Error',error.error)
      }
    )
  }
}
