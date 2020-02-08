import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SelectDropDownModule } from "ngx-select-dropdown";

@NgModule({
  declarations: [],
  imports: [
	  FormsModule,
	  ReactiveFormsModule,
	  SelectDropDownModule
  ],
  exports: [
  	FormsModule,
  	ReactiveFormsModule,
  	SelectDropDownModule
  ]
})
export class SharedModule {}
