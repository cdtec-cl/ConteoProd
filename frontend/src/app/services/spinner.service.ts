import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private spinner: NgxSpinnerService) { }

  show() {
    this.spinner.show(undefined,
    {
        type: "ball-clip-rotate-multiple",
        size: "large",
        bdColor: "rgba(100,149,237, .8)",
        color: "white"
      });
  }

  close() {
    this.spinner.hide();
  }

}
