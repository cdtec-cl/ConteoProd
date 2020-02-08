import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { TablesFincaComponent } from '../../pages/tables-finca/tables-finca.component';
import { TablesEmployeeComponent } from '../../pages/tables-employee/tables-employee.component';
import { TablesUserComponent } from '../../pages/tables-user/tables-user.component';
import { FormConteoComponent } from '../../pages/form-conteo/form-conteo.component';
import { TablesCuartelesComponent } from '../../pages/tables-cuarteles/tables-cuarteles.component';
import { FormCuartelComponent } from '../../pages/form-cuartel/form-cuartel.component';
import { FormUserComponent } from '../../pages/form-user/form-user.component';
import { FormEmployeeComponent } from '../../pages/form-employee/form-employee.component';
import { TablesReportComponent } from '../../pages/tables-report/tables-report.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TablesSeasonComponent } from 'src/app/pages/tables-season/tables-season.component';
import { FormSeasonComponent } from 'src/app/pages/form-season/form-season.component';
import { FormFarmComponent } from 'src/app/pages/form-farm/form-farm.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    NgxSpinnerModule,
    ComponentsModule,    
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    TablesFincaComponent,
    TablesEmployeeComponent,
    TablesUserComponent,
    TablesReportComponent,
    TablesSeasonComponent,
    TablesCuartelesComponent,
    IconsComponent,
    MapsComponent,
    FormConteoComponent,
    FormUserComponent,
    FormEmployeeComponent,
    FormCuartelComponent,
    FormSeasonComponent,
    FormFarmComponent
  ]
})

export class AdminLayoutModule {}
