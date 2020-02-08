import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeasonService } from 'src/app/services/season.service';
import { Season } from 'src/app/models/season';
import { NotificationService } from 'src/app/services/notification.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-form-season',
  templateUrl: './form-season.component.html',
  styleUrls: ['./form-season.component.scss']
})
export class FormSeasonComponent implements OnInit {
  id:any=null;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id")
  } 
}
