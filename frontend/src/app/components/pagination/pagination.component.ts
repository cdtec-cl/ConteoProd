import { Component, OnInit, Input } from '@angular/core';
import { PaginationService } from 'ngx-pagination'
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() list = [];
  public maxItem = 10;
  public page = 1;
  
  constructor() { }

  ngOnInit() {
  }

}
