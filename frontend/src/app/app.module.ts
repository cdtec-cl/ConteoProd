import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { EmployeeFormComponent } from 'src/app/components/employee-form/employee-form.component';
import { QuarterFormComponent } from 'src/app/components/quarter-form/quarter-form.component';
import { SeasonFormComponent } from 'src/app/components/season-form/season-form.component';
import { FarmFormComponent } from 'src/app/components/farm-form/farm-form.component';
import { UserFormComponent } from 'src/app/components/user-form/user-form.component';
import { CountsPerBatchComponent } from 'src/app/components/counts-per-batch/counts-per-batch.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { UserService } from './services/user.service';
import { FarmService } from './services/farm.service';
import { EmployeeService } from './services/employee.service';
import { QuarterService } from './services/quarter.service';
import { SeasonService } from './services/season.service';
import { CountService } from './services/count.service';
import { NotificationService } from './services/notification.service';
import { SpinnerService } from './services/spinner.service';
import { GuardService } from './services/guard.service';
import { loginService } from './services/login.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      enableHtml: true
    }),
    NgxSpinnerModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  providers: [
    UserService,
    FarmService,
    EmployeeService,
    QuarterService,
    SeasonService,
    CountService,
    NotificationService,
    SpinnerService,
    GuardService,
    loginService
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    EmployeeFormComponent,
    QuarterFormComponent,
    SeasonFormComponent,
    FarmFormComponent,
    UserFormComponent,
    CountsPerBatchComponent
  ]
})
export class AppModule { }
