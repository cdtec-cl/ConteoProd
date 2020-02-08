import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service'
import { FarmService } from 'src/app/services/farm.service';
import { User } from 'src/app/models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/services/notification.service';
import { SpinnerService } from 'src/app/services/spinner.service';
// elements
import {
  rolesConfigObj,
  farmsConfigObj,
} from "./selectsconfigs/configs";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
	user = new User();
	buttonMessage = '';
	//selects
	//roles
	roleConfig = rolesConfigObj;
	roles: Array<any> = [];
	selectedRoles: any = null;
	//farms
	farmsConfig = farmsConfigObj;
	farms: Array<any> = [];
	farmsSelected: Array<any> = [];
	selectedFarms: any = null;
	public id_user;
	public user_data;
	constructor(
		private farm_service: FarmService, 
		private user_service: UserService, 
    	private router: Router, 
    	private route: ActivatedRoute,
    	private notification_service: NotificationService,
    	private spinner_service: SpinnerService) {
			this.getUser(); 
		 }

	ngOnInit() {
		this.getRoles();    	
	  }
	  
	  getUser(){
		this.user_data = JSON.parse(localStorage.getItem('user'));
		this.id_user=this.user_data['user'].id;
	   }

  	getRoles(){
  		this.spinner_service.show();
	    this.user_service.getRoles().toPromise().then(
	      response => {
	        for (var i = 0; i < response.roles.length; i++) {
	          this.roles = [...this.roles, {id:response.roles[i].id,name:response.roles[i].name}];
	        }
	        this.getFarms();	        
	      }
	    );
  	}
  	getFarms(){
  		this.farm_service.getFarms().toPromise().then(response => {
	        for (var i = 0; i < response.farms.length; i++) {
	          this.farms = [...this.farms, {id:response.farms[i].id,name:response.farms[i].name}];
	        }
	        let id = this.route.snapshot.paramMap.get("id")
	        if(id){
	        	this.getFarmsSelected(id);
	        } else {
	          setTimeout(() => { this.spinner_service.close(); }, 500);
	        }
	        this.buttonMessage = id ? 'Actualizar Usuario': 'Agregar Usuario'
	      }
	    );
  	}
  	getFarmsSelected(id){
  		this.user_service.getFarmsSelected(id).toPromise().then(
		    response => {
		    	for (var i = 0; i < response.farms.length; i++) {
				    this.selectedFarms = [...this.selectedFarms, {id:response.farms[i].id,name:response.farms[i].name}];
				}
		        this.user_service.getUser(id).toPromise().then(
				    response => {
				        this.spinner_service.close();
				        this.user = response.user;
				        this.selectedRoles={id:response.user.role.id,name:response.user.role.name};
				    }
				);
		    }
		);

  		
  	}
  	saveUser(){
  		this.farmsSelected= this.farmsSelected.length>0?this.farmsSelected.map(({id}) => id):[];
	    this.spinner_service.show()
	    if(this.user.id){
	      this.user_service.updateUser(this.user.id, this.user, this.farmsSelected).toPromise().then(
	        response => {
	          	this.spinner_service.close()
	          	this.notification_service.showSuccess('Operación Exitosa', response.message)
	          	this.router.navigate(['../tables-usuarios']);
	        }
	      ).catch(
	        error => {
	        	console.log(error);
	          	this.spinner_service.close()
	          	this.notification_service.showError('Error',error.error)
	        }
	      );      
	    } 
	    else{
	      this.user_service.createUser(this.user, this.farmsSelected).toPromise().then(
	        response => {
	          	this.spinner_service.close()
	          	this.notification_service.showSuccess('Operación Exitosa', response.message)
	          	this.router.navigate(['../tables-usuarios']);
	        }
	      ).catch(
	        error => {
	        	console.log(error);
	          	this.spinner_service.close()
	          	this.notification_service.showError('Error',error.error)
	        }
	      );      
	    }
  	}
	selectionChanged(event,select){
		switch (select) {
			case "role":
	  			this.user.id_role=event.value?event.value.id:null;
				break;
			case "farm":
	  			this.farmsSelected=event.value;
				break;
			default:
				// code...
				break;
		}
	}

}
