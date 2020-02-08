import { Component, OnInit , Input , Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { SeasonService } from 'src/app/services/season.service';
import { Season } from 'src/app/models/season';
import { NotificationService } from 'src/app/services/notification.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-season-form',
  templateUrl: './season-form.component.html',
  styleUrls: ['./season-form.component.scss']
})
export class SeasonFormComponent implements OnInit {

  	season = null;
  	buttonMessage = '';

	@Input() param: any;
  	@Output() passEntry: EventEmitter<any> = new EventEmitter();  

	constructor(
	    private season_service: SeasonService, 
	    private router: Router, 
	    private notification_service: NotificationService,
	    private spinner_service: SpinnerService
	) {}

	ngOnInit() {
	  	this.spinner_service.show()
		this.season = new Season();
		switch (this.param.key) {
	    	case "id":
	  			if(this.param.value) {
				 	this.spinner_service.close();
				  	this.season_service.getSeason(this.param.value).toPromise().then(
				        response => {
				          this.spinner_service.close();
				          this.season = response.season
				        }
				      );
				} else {
				  setTimeout(() => { this.spinner_service.close(); }, 500);
				}
				this.buttonMessage = this.param.value ? 'Actualizar Temporada': 'Agregar Temporada'
	  			break;
	  		case "name":
	    	    if(this.param.value) {
	    	      this.spinner_service.close()
	    	      this.season.name=this.param.value;
	    	    } else {
	    	      setTimeout(() => { this.spinner_service.close(); }, 500);
	    	    }
	    	    this.buttonMessage = 'Agregar Temporada';
	    	    break;
	  			default:
	  				// code...
	  				break;
		}
	}
  	saveSeason(){
    	this.spinner_service.show()
	    if(this.season.id){
	      this.season_service.updateSeason(this.season.id, this.season).toPromise().then(
	        response => {
	          this.spinner_service.close()
	          this.notification_service.showSuccess('Operación Exitosa', response.message)
	          this.router.navigate(['../tables-temporadas']);
	        }
	      ).catch(
	        error => {
	          this.spinner_service.close()
	          this.notification_service.showError('Error',error.error)
	        }
	      );      
	    } 
	    else{
	      this.season_service.createSeason(this.season).toPromise().then(
	        response => {
	          this.spinner_service.close()
	          this.notification_service.showSuccess('Operación Exitosa', response.message);
	          switch (this.param.key) {
	            case "id":
	              this.router.navigate(['../tables-temporadas']);
	              break;
	            case "name":
	              this.passEntry.emit(response.season.id);
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
