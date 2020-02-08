import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FarmService } from 'src/app/services/farm.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-tables-finca',
  templateUrl: './tables-finca.component.html',
  styleUrls: ['./tables-finca.component.scss']
})
export class TablesFincaComponent implements OnInit {

  public farms = [];
  buttonMessage = ' Nuevo Campo';
  buttonIcon = 'ni ni-fat-add';
  page = 1
  public user:any=null;


  constructor(
    private farm_service: FarmService, 
    private router: Router,
    private notification_service: NotificationService,
    private spinner_service: SpinnerService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')).user;
    this.spinner_service.show()
    this.farm_service.getFarmsByUserAuth().toPromise().then(
      response => {
        this.spinner_service.close();
        this.farms = response.farms;
      }
    ).catch( 
      error => {
        this.spinner_service.close()
        this.notification_service.showError('Error',error.error)
      }
    )
  }

  toEdit(id){
    this.router.navigate([`/form-campo/${id}`])
  }

  detail(){

  }

  delete(id){
    this.spinner_service.show()
    this.farm_service.deleteFarm(id).toPromise().then(
      response => {
        this.spinner_service.close()
        this.farms = this.farms.filter(farm_from_list => farm_from_list.id !== id)
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
