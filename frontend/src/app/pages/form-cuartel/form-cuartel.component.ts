import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-cuartel',
  templateUrl: './form-cuartel.component.html',
  styleUrls: ['./form-cuartel.component.scss']
})
export class FormCuartelComponent implements OnInit {
  id:any=null;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id")
  } 

}
