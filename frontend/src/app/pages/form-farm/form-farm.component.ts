import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-farm',
  templateUrl: './form-farm.component.html',
  styleUrls: ['./form-farm.component.scss']
})
export class FormFarmComponent implements OnInit {

  id:any=null;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id")
  }

  

}
