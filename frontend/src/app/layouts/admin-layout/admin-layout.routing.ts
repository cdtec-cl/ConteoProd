import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { TablesFincaComponent } from '../../pages/tables-finca/tables-finca.component';
import { TablesEmployeeComponent } from '../../pages/tables-employee/tables-employee.component';
import { TablesReportComponent } from '../../pages/tables-report/tables-report.component';
import { TablesUserComponent } from '../../pages/tables-user/tables-user.component';
import { TablesCuartelesComponent } from '../../pages/tables-cuarteles/tables-cuarteles.component';
import { FormCuartelComponent } from '../../pages/form-cuartel/form-cuartel.component';
import { FormConteoComponent } from '../../pages/form-conteo/form-conteo.component';
import { FormUserComponent } from '../../pages/form-user/form-user.component';
import { FormEmployeeComponent } from '../../pages/form-employee/form-employee.component';
import { TablesSeasonComponent } from 'src/app/pages/tables-season/tables-season.component';
import { FormSeasonComponent } from 'src/app/pages/form-season/form-season.component';
import { FormFarmComponent } from 'src/app/pages/form-farm/form-farm.component';
import { RandomGuard } from "../../guards/random.guard";

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',        component: DashboardComponent, canActivate: [RandomGuard]},
    { path: 'user-profile',     component: UserProfileComponent, canActivate: [RandomGuard]},
    { path: 'tables',           component: TablesComponent, canActivate: [RandomGuard]},
    { path: 'tables-campos',     component: TablesFincaComponent, canActivate: [RandomGuard]},
    { path: 'tables-cuarteles', component: TablesCuartelesComponent, canActivate: [RandomGuard]},
    { path: 'tables-empleados',  component: TablesEmployeeComponent, canActivate: [RandomGuard]},
    { path: 'tables-usuarios',      component: TablesUserComponent, canActivate: [RandomGuard]},
    { path: 'tables-temporadas',    component: TablesSeasonComponent, canActivate: [RandomGuard]},
    { path: 'tables-report',    component: TablesReportComponent, canActivate: [RandomGuard]},
    { path: 'form-conteo',      component: FormConteoComponent, canActivate: [RandomGuard]},
    { path: 'form-conteo/:id',   component: FormConteoComponent, canActivate: [RandomGuard]},
    { path: 'form-usuario',        component: FormUserComponent, canActivate: [RandomGuard]},
    { path: 'form-usuario/:id',    component: FormUserComponent, canActivate: [RandomGuard]},
    { path: 'form-empleado',    component: FormEmployeeComponent, canActivate: [RandomGuard]},
    { path: 'form-empleado/:id',component: FormEmployeeComponent, canActivate: [RandomGuard]},
    { path: 'form-cuartel',     component: FormCuartelComponent, canActivate: [RandomGuard]},
    { path: 'form-cuartel/:id', component: FormCuartelComponent, canActivate: [RandomGuard]},
    { path: 'form-campo',        component: FormFarmComponent, canActivate: [RandomGuard]},
    { path: 'form-campo/:id',    component: FormFarmComponent, canActivate: [RandomGuard]},
    { path: 'form-temporada',      component: FormSeasonComponent, canActivate: [RandomGuard]},
    { path: 'form-temporada/:id',  component: FormSeasonComponent, canActivate: [RandomGuard]},
    { path: 'icons',            component: IconsComponent, canActivate: [RandomGuard]}
 
];
