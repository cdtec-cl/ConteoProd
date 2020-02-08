import { Component, OnInit } from '@angular/core';
import { QuarterService } from 'src/app/services/quarter.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-tables-cuarteles',
  templateUrl: './tables-cuarteles.component.html',
  styleUrls: ['./tables-cuarteles.component.scss']
})
export class TablesCuartelesComponent implements OnInit {

  public quarters = [];
  buttonMessage = 'Nuevo Cuartel';
  buttonIcon = 'ni ni-fat-add';
  page = 1

  constructor(
    private quarter_service: QuarterService, 
    private router: Router,
    private notification_service: NotificationService,
    private spinner_service: SpinnerService
  ) { }

  ngOnInit() {
    this.spinner_service.show()
    this.quarter_service.getQuarters().toPromise().then(
      response => {
        this.spinner_service.close()
        this.quarters = response.quarters
      }
    ).catch( 
      error => {
        this.spinner_service.close()
        this.notification_service.showError('Error',error.error)
      }
    )
  }

  toEdit(id){
    this.router.navigate([`/form-cuartel/${id}`])
  }

  detail(){

  }

  delete(id){
    this.spinner_service.show()
    this.quarter_service.deleteQuarter(id).toPromise().then(
      response => {
        this.spinner_service.close()
        this.quarters = this.quarters.filter(quarter_from_list => quarter_from_list.id !== id)
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
