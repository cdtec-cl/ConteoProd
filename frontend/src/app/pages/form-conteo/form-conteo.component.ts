import { Component, OnInit } from '@angular/core';
import { Count } from 'src/app/models/count';
import { CountService } from 'src/app/services/count.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SeasonService } from 'src/app/services/season.service';
import { FarmService } from 'src/app/services/farm.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { QuarterService } from 'src/app/services/quarter.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-conteo',
  templateUrl: './form-conteo.component.html',
  styleUrls: ['./form-conteo.component.scss']
})
export class FormConteoComponent implements OnInit {

  public count = new Count();
  public counts = [];
  public farms = [];
  public employees = [];
  public quarters = [];
  public seasons = [];
  public working_days = [
    'AM',
    'PM',
    'COMPLETA'
  ];
  public countscols = [
    'Medio',
    'Completado'
  ];
  buttonMessage = '';
  buttonSaveMessage = '';
  private modalRef:any=null;
  private idParam:any=null;
  constructor(
    private count_service: CountService, 
    private employee_service: EmployeeService, 
    private season_service: SeasonService, 
    private farm_service: FarmService, 
    private quarter_service: QuarterService, 
    private router: Router, 
    private route: ActivatedRoute,
    private notification_service: NotificationService,
    private spinner_service: SpinnerService,
    config: NgbModalConfig,
    private modalService: NgbModal

  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.spinner_service.show()
    this.idParam= this.route.snapshot.paramMap.get("id")
    this.getFarms();
    this.getEmployees();
    this.getQuarters();
    this.getSeasons();   
    /*this.count_service.getCounts().toPromise().then(
      response => {
        this.counts = response.counts.reverse();
      }
    ).catch( 
      error => {

    });*/
    if(this.idParam){
      this.getCounts(this.idParam);
    }
    else{
      setTimeout(() => { this.spinner_service.close(); }, 500);
    }
    this.count.id_user = 1;
    this.buttonMessage = this.idParam ? 'Actualizar Conteo': 'Agregar Conteo'
    this.buttonSaveMessage =  'Guardar Conteo'

  }
  getSeasons(){
    this.season_service.getSeasons().toPromise().then(
      response => {
        this.seasons = response.seasons
      }
    )
  }
  getQuarters(){
    this.quarter_service.getQuarters().toPromise().then(
      response => {
        this.quarters = response.quarters
      }
    )
  }
  getEmployees(){
    this.employee_service.getEmployees().toPromise().then(
      response => {
        this.employees = response.empleados
      }
    )
  }
  getFarms(){
    this.farm_service.getFarms().toPromise().then(
      response => {
        this.farms = response.farms
      }
    )
  }
  getCounts(id:any){
    this.count_service.getCount(id).toPromise().then(
      response => {
        this.spinner_service.close();
        this.count = response.count;
      }
    )
  }
  saveCount(){
    this.spinner_service.show();
    if(this.count.id_employee && this.count.id_quarter && this.count.id_season && this.count.id_farm){
      if(this.count.id){
        this.count_service.updateCount(this.count.id, this.count).toPromise().then(
          response => {            
            this.spinner_service.close();

            if(!response.count){
              this.notification_service.showWarning('Ups Sucedio Algo!', response.message)
            }else{
              this.modalRef.close();
              this.getCounts(this.idParam);
              this.notification_service.showSuccess('Operación Exitosa', response.message)
            }
            //let index = this.counts.findIndex(item => item.id = this.count.id);
            //console.log(index)
            //this.counts[index] = response.count;
          }
        ).catch(
          error => {
            this.spinner_service.close()
            this.notification_service.showError('Error',error.error)
          }
        );      
      } 
      else{
        this.count_service.createCount(this.count).toPromise().then(
          response => {
            this.spinner_service.close()
            this.modalRef.close();
            this.counts.push(response.count);
            this.counts.reverse()
            this.notification_service.showSuccess('Operación Exitosa', response.message)
          }
        ).catch(
          error => {
            this.spinner_service.close()
            this.notification_service.showError('Error',error.error)
          }
        );      
      }
    }else{
      if(!this.count.id_farm){
        this.notification_service.showWarning('Seleccione Campo', '');
      }
      if(!this.count.id_employee){
        this.notification_service.showWarning('Seleccione Trabajador', '');
      }
      if(!this.count.working_day){
        this.notification_service.showWarning('Seleccione Jornada', '');
      }
      if(!this.count.date){
        this.notification_service.showWarning('Seleccione Fecha para contar', '');
      } 
      if(!this.count.id_quarter){
        this.notification_service.showWarning('Seleccione cuartel', '');
      }
      if(!this.count.id_season){
        this.notification_service.showWarning('Seleccione Temporada',''); 
      }
    }
  }

  filter(array, search_item){
    let filter_array = array.filter( current_item => current_item.id == search_item)
    return filter_array[0].name

  }

  open(content) {    
    if(!this.count.id_farm){
      this.notification_service.showWarning('Seleccione Campo', '');
    }
    if(!this.count.id_employee){
      this.notification_service.showWarning('Seleccione Trabajador', '');
    }
    if(!this.count.working_day){
      this.notification_service.showWarning('Seleccione Jornada', '');
    }
    if(!this.count.date){
      this.notification_service.showWarning('Seleccione Fecha para contar', '');
    } 
    if(!this.count.id_quarter){
      this.notification_service.showWarning('Seleccione cuartel', '');
    }
    if(!this.count.id_season){
      this.notification_service.showWarning('Seleccione Temporada',''); 
    }
    if(this.count.id_farm&&this.count.id_employee&&this.count.working_day&&this.count.date&&this.count.id_quarter&&this.count.id_season){
      this.modalRef=this.modalService.open(content);
    }

    
  }

}
