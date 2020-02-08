import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';
import { Farm } from 'src/app/models/farm';
import { FarmService } from 'src/app/services/farm.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-farm-form',
  templateUrl: './farm-form.component.html',
  styleUrls: ['./farm-form.component.scss']
})
export class FarmFormComponent implements OnInit {
	farm=null
	buttonMessage = '';
  	@Input() param: any;
  	@Output() passEntry: EventEmitter<any> = new EventEmitter();

	constructor(private farm_service: FarmService, 
    private router: Router, 
    private notification_service: NotificationService,
    private spinner_service: SpinnerService) { }

	ngOnInit() {
		this.spinner_service.show();
		this.farm = new Farm();

		switch (this.param.key) {
	      case "id":
		      if(this.param.value) {
		        this.spinner_service.close()
		        this.farm_service.getFarm(this.param.value).toPromise().then(
			        response => {
			          this.spinner_service.close()
			          this.farm = response.farm
			        }
			      )
		      } else {
		        setTimeout(() => { this.spinner_service.close(); }, 500);
		      }
		      this.buttonMessage = this.param.value ? 'Actualizar Campo': 'Agregar Campo'
		      break;
	      case "name":
		        if(this.param.value) {
		          this.spinner_service.close()
		          this.farm.name=this.param.value;
		        } else {
		          setTimeout(() => { this.spinner_service.close(); }, 500);
		        }
		        this.buttonMessage = 'Agregar Campo';
	        break;
	      default:
		      break;
	    }
	}
	toEdit(id){
	    this.router.navigate([`/form-campo/${id}`])
	}

	saveFarm(){
	    this.spinner_service.show()
	    if(this.farm.id){
	      this.farm_service.updateFarm(this.farm.id, this.farm).toPromise().then(
	        response => {
	          this.spinner_service.close()
	          this.notification_service.showSuccess('Operación Exitosa', response.message)
	          this.router.navigate(['../tables-campos']);
	        }
	      ).catch(
	        error => {
	          this.spinner_service.close()
	          this.notification_service.showError('Error',error.error)
	        }
	      );      
	    } 
	    else{
	      this.farm_service.createFarm(this.farm).toPromise().then(
	        response => {
	          this.spinner_service.close()
	          this.notification_service.showSuccess('Operación Exitosa', response.message)
	          switch (this.param.key) {
	            case "id":
	              this.router.navigate(['../tables-campos']);
	              break;
	            case "name":
	              this.passEntry.emit(response.farm.id);
	              break;
	            default:
	              // code...
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
}
