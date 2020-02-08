import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { QuarterFormComponent } from './quarter-form/quarter-form.component';
import { SeasonFormComponent } from './season-form/season-form.component';
import { FarmFormComponent } from './farm-form/farm-form.component';
import { CountsPerBatchComponent } from './counts-per-batch/counts-per-batch.component';
import { UserFormComponent } from './user-form/user-form.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GenericButtonComponent } from './generic-button/generic-button.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';
// modules
import { SharedModule } from "../modules/shared/shared.module";
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    NgxPaginationModule,
    SharedModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    GenericButtonComponent,
    PaginationComponent,
    EmployeeFormComponent,
    QuarterFormComponent,
    SeasonFormComponent,
    FarmFormComponent,
    UserFormComponent,
    CountsPerBatchComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    GenericButtonComponent,
    PaginationComponent,
    NgxPaginationModule,
    EmployeeFormComponent,
    QuarterFormComponent,
    SeasonFormComponent,
    FarmFormComponent,
    UserFormComponent,
    CountsPerBatchComponent
  ]
})
export class ComponentsModule { }
