import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuardService } from "../../services/guard.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private guardService: GuardService, private router: Router) { }

  ngOnInit() {
  	this.guardService.getAuthUser()
      .toPromise()
      .then(response => {
      })
      .catch(error => {
      	this.removeLocalStorageItems();
    	this.router.navigate(["/"]);
      });
  }

  removeLocalStorageItems(){
    localStorage.clear();
  }
}
