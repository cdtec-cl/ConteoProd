import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { GuardService } from "src/app/services/guard.service";


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
{ path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
{ path: '/tables-campos', title: 'Campos',  icon:'ni-map-big text-green', class: '' },
{ path: '/tables-cuarteles', title: 'Cuarteles',  icon:'ni-compass-04 text-blue', class: '' },
{ path: '/tables-temporadas', title: 'Temporadas',  icon:'ni-time-alarm text-blue', class: '' },
{ path: '/tables', title: 'Conteos',  icon:'ni-bullet-list-67 text-red', class: '' },
{ path: '/tables-empleados', title: 'Empleados',  icon:'ni-circle-08 text-orange', class: '' },
{ path: '/tables-usuarios', title: 'Usuarios',  icon:'ni-single-02 text-yellow', class: '' },
{ path: '/tables-report', title: 'Importar/Exportar',  icon:'ni-collection text-green', class: '' },
{ path: '/login', title: 'Cerrar Sesión',  icon:'ni-user-run text-red', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[]=[];
  public isCollapsed = true;
  public user:any=null;
  constructor(
    private user_service: UserService, 
    private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')).user;
    this.generateSidebar();   
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
  generateSidebar(){
    this.menuItems=ROUTES.filter((menuItem) => {
      switch (this.user.id_role) {
        case 1: //master          
          return menuItem
        break;
        case 2: //administrador
          if(menuItem.title!='Usuarios'){
            return menuItem
          }
        break;
        default://3:consultor          
          if(menuItem.title=='Dashboard'||menuItem.title=='Conteos'||menuItem.title=='Importar/Exportar'||menuItem.title=='Cerrar Sesión'){
            return menuItem
          }
        break;
      }
    });
  }
}
