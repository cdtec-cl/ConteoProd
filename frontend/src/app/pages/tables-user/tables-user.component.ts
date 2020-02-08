import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-tables-user',
  templateUrl: './tables-user.component.html',
  styleUrls: ['./tables-user.component.scss']
})
export class TablesUserComponent implements OnInit {

  public users = [];
  buttonMessage = 'Nuevo Usuario';
  buttonIcon = 'ni ni-fat-add';
  page = 1
  
  constructor(
    private user_service: UserService, 
    private router: Router,
    private notification_service: NotificationService,
    private spinner_service: SpinnerService
  ) { }

  ngOnInit() {
    this.spinner_service.show()
    this.user_service.getUsers().toPromise().then(
      response => {
        this.users = response.users;
        this.spinner_service.close();
      }
    ).catch( 
      error => {
        this.spinner_service.close()
        this.notification_service.showError('Error',error.error)
      }
    )
  }

  toEdit(id){
    this.router.navigate([`/form-usuario/${id}`])
  }

  detail(){

  }

  delete(id){

    this.spinner_service.show()
    this.user_service.deleteUser(id).toPromise().then(
      response => {
        this.spinner_service.close()
        this.users = this.users.filter(user_from_list => user_from_list.id !== id)
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
