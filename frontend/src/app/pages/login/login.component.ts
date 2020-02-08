import { Component, OnInit, OnDestroy } from '@angular/core';
import { loginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Login } from 'src/app/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  loginData = new Login();
  
  constructor(
    private loginService: loginService, 
    private router: Router,
    private notification_service: NotificationService,
    private spinner_service: SpinnerService
  ) {}
   
  ngOnInit() {
    this.removeLocalStorageItems();
  }
  ngOnDestroy() {
  }
  removeLocalStorageItems(){
    localStorage.clear();
  }
  login() {
    this.spinner_service.show()
    this.loginService.login(this.loginData).toPromise().then(
      response => {        
        localStorage.setItem('access_token', response.token);
        localStorage.setItem('user', JSON.stringify(response));
        
        this.router.navigate(['../dashboard']);
        this.spinner_service.close();
      }
    ).catch(
      error =>{
        this.spinner_service.close();
        this.notification_service.showError('Error',error.error)
      }
    )
  }

}
