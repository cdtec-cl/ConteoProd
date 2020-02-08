import { Component, OnInit , Input  , Output, EventEmitter } from '@angular/core';
import { Quarter } from 'src/app/models/quarter';
import { QuarterService } from 'src/app/services/quarter.service';
import { FarmService } from 'src/app/services/farm.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { SpinnerService } from 'src/app/services/spinner.service';
@Component({
  selector: 'app-quarter-form',
  templateUrl: './quarter-form.component.html',
  styleUrls: ['./quarter-form.component.scss']
})
export class QuarterFormComponent implements OnInit {
  quarter = null;
  farms = [];
  buttonMessage = '';
  public user;
  public id_farm;
  public id_user;

  @Input() param: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();  

  constructor(
    private quarter_service: QuarterService,
    private farm_service: FarmService,
    private router: Router,
    private notification_service: NotificationService,
    private spinner_service: SpinnerService
  ) {
    this.getUser();
  }

  ngOnInit() {
    this.spinner_service.show();
    this.quarter = new Quarter();
    this.getFarms();
    switch (this.param.key) {
      	case "id":
  			if(this.param.value) {
		      this.spinner_service.close();
		      this.quarter_service.getQuarter(this.param.value).toPromise().then(
		        response => {
		          this.quarter = response.quarter;
		        }
		      ).catch(
		        error => {
		          this.spinner_service.close();
		          this.notification_service.showError('Error', error.error);
		        }
		      );
		    } else {
		      setTimeout(() => { this.spinner_service.close(); }, 500);
		    }
		    this.buttonMessage = this.param.value ? 'Actualizar Cuartel' : 'Agregar Cuartel';
  		break;
  		case "name":
	        if(this.param.value) {
	          this.spinner_service.close()
	          this.quarter.name=this.param.value;
	        } else {
	          setTimeout(() => { this.spinner_service.close(); }, 500);
	        }
	        this.buttonMessage = 'Agregar Cuartel';
        break;
  		default:
  			// code...
  			break;
  	}
  }


  getFarms(){
  	this.farm_service.getFarms().toPromise().then(
      response => {
        this.farms = response.farms;
      }
    ).catch(
      error => {
        this.spinner_service.close();
        this.notification_service.showError('Error', error.error);
      }
    );
  }

  getUser(){
    this.user = JSON.parse(localStorage.getItem('user'));
    this.id_user=this.user['user'].id;
   }

  saveQuarter() {
    this.spinner_service.show();
    if (this.quarter.id) {
      this.quarter_service.updateQuarter(this.quarter.id, this.quarter).toPromise().then(
        response => {
          this.spinner_service.close();
          this.notification_service.showSuccess('Operación Exitosa', response.message);
          this.router.navigate(['../tables-cuarteles']);
        }
      ).catch(
        error => {
          this.spinner_service.close();
          this.notification_service.showError('Error', error.error);
        }
      );
    } else {
      this.quarter_service.createQuarter(this.quarter).toPromise().then(
        response => {
          this.spinner_service.close();
          this.notification_service.showSuccess('Operación Exitosa', response.message);
          switch (this.param.key) {
            case "id":
              this.router.navigate(['../tables-cuarteles']);
              break;
            case "name":
              this.passEntry.emit(response.quarter.id);
              break;
            default:
              // code...
              break;
          }
        }
      ).catch(
        error => {
          this.spinner_service.close();
          this.notification_service.showError('Error', error.error);
        }
      );
    }

  }

}
