import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Count } from 'src/app/models/count';
import { CountXlsx } from 'src/app/models/count-xlsx';
import { CountService } from 'src/app/services/count.service';
import { FarmService } from 'src/app/services/farm.service';
import { QuarterService } from 'src/app/services/quarter.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { SeasonService } from 'src/app/services/season.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SpinnerService } from 'src/app/services/spinner.service';

import { EmployeeFormComponent } from 'src/app/components/employee-form/employee-form.component';
import { QuarterFormComponent } from 'src/app/components/quarter-form/quarter-form.component';
import { SeasonFormComponent } from 'src/app/components/season-form/season-form.component';
import { FarmFormComponent } from 'src/app/components/farm-form/farm-form.component';

import { CountsPerBatchComponent } from 'src/app/components/counts-per-batch/counts-per-batch.component';

import { environment } from '../../../environments/environment';

//upload 
import * as XLSX from 'ts-xlsx';
import * as moment from "moment";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  public counts = [];
  public filteredCounts = [];
  public farms = [];
  public employees = [];
  public quarters = [];
  public seasons = [];
  public user:any=null;
  buttonViewRecordsPerBatch = 'Registros por lote';
  buttonMessageNew = 'Nuevo Conteo';
  buttonIconNew = 'ni ni-fat-add';
  buttonMessageImport = 'Guardar';
  buttonIconImport = 'ni ni-fat-add';
  public searching = {
    'farm': '',
    'season': '',
    'initialDate': '',
    'endDate': ''
  };
  searhcButtonIcon = 'ni ni-zoom-split-in'
  searchButtonMessage = 'Buscar'
  page = 1
  employeeRut:string=null;
  //upload 
  @ViewChild('content') public content: ElementRef; 
  arrayBuffer:any;
  file:File;
  fileData: Array<CountXlsx>;
  modalRefExcelList: any;
  modalRef: any;
  count:Count;

  constructor(
    private count_service: CountService, 
    private employee_service: EmployeeService, 
    private season_service: SeasonService, 
    private farm_service: FarmService, 
    private quarter_service: QuarterService,  
    private router: Router,
    private notification_service: NotificationService,
    private spinner_service: SpinnerService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {    
    this.getFarms();
    this.getEmployees();
    this.getQuarters();
    this.getSeasons();
    this.getCounts(); 
    this.user = JSON.parse(localStorage.getItem('user')).user;
  }
  getSeasons(){
    this.spinner_service.show();
    this.season_service.getSeasons().toPromise().then(
      response => {
        this.spinner_service.close();
        this.seasons = response.seasons
      }
    ).catch( 
      error => {
        this.spinner_service.close();
        this.notification_service.showError('Error',error.error)
      }
    )
  }

  getQuarters(){
    this.spinner_service.show();
    this.quarter_service.getQuarters().toPromise().then(
      response => {
        this.spinner_service.close();
        this.quarters = response.quarters
      }
    ).catch( 
      error => {
        this.spinner_service.close();
        this.notification_service.showError('Error',error.error)
      }
    )
  }

  getEmployees(){
    this.spinner_service.show();
    this.employee_service.getEmployees().toPromise().then(
      response => {
        this.spinner_service.close();
        this.employees = response.empleados
      }
    ).catch( 
      error => {
        this.spinner_service.close();
        this.notification_service.showError('Error',error.error)
      }
    )
  }

  getFarms(){
    this.spinner_service.show();
    this.farm_service.getFarms().toPromise().then(
      response => {
        this.spinner_service.close();
        this.farms = response.farms
      }
    ).catch( 
      error => {
        this.spinner_service.close();
        this.notification_service.showError('Error',error.error)
      }
    )
  }

  getCounts(){
    this.spinner_service.show();
    this.count_service.getCounts().toPromise().then(
      response => {
        this.spinner_service.close()
        this.counts = response.counts;
        this.filteredCounts = this.counts.reverse();
      }
    ).catch( 
      error => {
        this.spinner_service.close()
        this.notification_service.showError('Error',error.error)
      }
    )
  }

  toEdit(id){
    this.router.navigate([`/form-conteo/${id}`])
  }

  detail(){

  }

  delete(id){
    this.spinner_service.show()
    this.count_service.deleteCount(id).toPromise().then(
      response => {
        this.spinner_service.close()
        this.counts = this.counts.filter(count_from_list => count_from_list.id !== id)
        this.notification_service.showSuccess('Operación Exitosa', response.message);
        this.getCounts();
      }
    ).catch(
      error =>{
        this.spinner_service.close()
        this.notification_service.showError('Error',error.error)
      }
    )
  }

  filter(array, search_item, elements){
    let filter_array;
    switch (elements) {
      case "employees":
        filter_array = array.filter( current_item => current_item.rut == search_item );
        break;
      case "counts":
        filter_array = array.filter( current_item =>{
          return current_item.employee_rut.toLowerCase() == (search_item.Trabajador.toString()).toLowerCase() && 
          current_item.season_name.toLowerCase() == (search_item.Temporada.toString()).toLowerCase() && 
          current_item.quarter_name.toLowerCase() == (search_item.Cuartel.toString()).toLowerCase() && 
          current_item.farm_name.toLowerCase() == (search_item.Campo.toString()).toLowerCase() && 
          current_item.working_day.toLowerCase() == (search_item.Jornada.toString()).toLowerCase() && 
          current_item.cant == search_item.CantidadRacimos && 
          current_item.date == moment(search_item.FechaConteo).format("YYYY-MM-DD") &&
          parseInt(current_item.row) == search_item.No_Hilera &&
          parseInt(current_item.plant) == search_item.No_Planta;
        });
        break;      
      default:
        filter_array = array.filter( current_item => current_item.name.toLowerCase() == search_item.toLowerCase());
        break;
    }
    return filter_array[0]=== undefined?{
      exist:false,
      name:search_item+" (No registrado)",
      value:search_item+" (No registrado)"
    }:{
      exist:true,
      name:filter_array[0].name,
      value:elements=="employees"?filter_array[0].rut:filter_array[0].name
    };
  }

  //uploads
  handleFileInput($event: any): void {
    console.log("handleFileInput");
    this.file= $event.target.files[0]; 
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, {type:"binary", cellDates:true});
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        this.fileData=XLSX.utils.sheet_to_json(worksheet,{raw:true});//dateNF:"DD-MM-YY"
        if(this.fileData.length>0){
          if(this.fileData[0].Trabajador && this.fileData[0].Jornada && this.fileData[0].CantidadRacimos  && this.fileData[0].FechaConteo && this.fileData[0].Cuartel && this.fileData[0].Campo && this.fileData[0].Temporada && this.fileData[0].No_Hilera && this.fileData[0].No_Planta){
            this.modalRefExcelList = this.modalService.open(this.content,{ size: "lg",backdrop:"static"});
          }else{
            this.notification_service.showError('Error','El archivo no cumple con el formato esperado');
            this.notification_service.showError('Error','Debe subir el archivo con el siguiente formato...'); 
            //validar si esta en produccion o en local        
            setTimeout(() => { 
              window.open(environment.base_url+"../files/counts.xlsx");
            }, 1000);
          } 
        }else{
          this.notification_service.showError('Error','El archivo no contiene data');
        }        
    }
    if(this.file){
      fileReader.readAsArrayBuffer(this.file);
    }
  }
  async save(){
    for(var i = 0; i < this.fileData.length; i++){
      let elementExist = this.filter(this.counts, this.fileData[i], "counts").exist;
      if(elementExist){        
        this.notification_service.showInfo(
          'Registro existente',
          this.fileData[i].Trabajador+","+
          this.fileData[i].Jornada+","+
          this.fileData[i].CantidadRacimos+","+
          this.fileData[i].FechaConteo+","+
          this.fileData[i].Cuartel+","+
          this.fileData[i].Campo+","+
          this.fileData[i].Temporada+","+
          this.fileData[i].No_Hilera+","+
          this.fileData[i].No_Planta
          );
      }else{
        //processElement 
        let employeeExist = this.filter(this.employees, this.fileData[i].Trabajador, "employees").exist;
        let quarterExist = this.filter(this.quarters, this.fileData[i].Cuartel,"quarters").exist;
        let seasonExist = this.filter(this.seasons, this.fileData[i].Temporada,"seasons").exist;
        let farmExist = this.filter(this.farms, this.fileData[i].Campo,"farms").exist;
        if( employeeExist && quarterExist && seasonExist && farmExist){
          this.count= new Count();
          this.count.employee_rut= (this.fileData[i].Trabajador).toString();//rut del trabajador
          this.count.working_day= (this.fileData[i].Jornada).toString(); 
          this.count.countscol= this.fileData[i].ControlRealizado;         
          this.count.cant= this.fileData[i].CantidadRacimos;
          this.count.date= moment(this.fileData[i].FechaConteo).format("YYYY-MM-DD HH:mm"); 
          this.count.quarter_name= (this.fileData[i].Cuartel).toString();//nombre de cuartel
          this.count.season_name= (this.fileData[i].Temporada).toString();//nombre de temporada
          this.count.farm_name= (this.fileData[i].Campo).toString();//nombre de campo
          this.count.row= this.fileData[i].No_Hilera;//id hilera
          this.count.plant= this.fileData[i].No_Planta;//id planta
          this.count.id_user= 1;
          this.count.registered_in_batch= true;//true          
          this.createCount(this.count);
        }else{
            let employeeId,employeeRut;
            let quarterId,quarterName;
            let seasonId,seasonName;
            let farmId,farmName;
            if(!employeeExist){
              this.notification_service.showWarning('Elemento no registrado','Debe registrar el empleado asociado a este conteo')
              this.modalRef = this.modalService.open(EmployeeFormComponent,{ size: "lg"});
              this.modalRef.componentInstance.param={key:'rut',value:this.fileData[i].Trabajador};          
              employeeId = await this.createNewElement(this.modalRef);
              this.modalRef.close();
            }else{
              employeeRut=this.fileData[i].Trabajador;
            }
            if(!quarterExist){
              this.notification_service.showWarning('Elemento no registrado','Debe registrar el cuartel asociado a este conteo')
              this.modalRef = this.modalService.open(QuarterFormComponent,{ size: "lg"});
              this.modalRef.componentInstance.param={key:'name',value:this.fileData[i].Cuartel};          
              quarterId = await this.createNewElement(this.modalRef);
              this.modalRef.close();
            }else{
              quarterName=this.fileData[i].Cuartel;
            }
            if(!seasonExist){
              this.notification_service.showWarning('Elemento no registrado','Debe registrar la temporada asociada a este conteo')
              this.modalRef = this.modalService.open(SeasonFormComponent,{ size: "lg"});
              this.modalRef.componentInstance.param={key:'name',value:this.fileData[i].Temporada};          
              seasonId = await this.createNewElement(this.modalRef);
              this.modalRef.close();
            }else{
              seasonName=this.fileData[i].Temporada;
            }
            if(!farmExist){
              this.notification_service.showWarning('Elemento no registrado','Debe registrar el campo asociada a este conteo')
              this.modalRef = this.modalService.open(FarmFormComponent,{ size: "lg"});
              this.modalRef.componentInstance.param={key:'name',value:this.fileData[i].Campo};          
              farmId = await this.createNewElement(this.modalRef);
              this.modalRef.close();
            }else{
              farmName=this.fileData[i].Campo;
            }
            if((employeeId||employeeRut) && (quarterId||quarterName) && (seasonId||seasonName)&& (farmId||farmName)){
              this.count= new Count();
              if(employeeId){this.count.id_employee= employeeId;}
              if(employeeRut){this.count.employee_rut= employeeRut;}
              if(quarterId){this.count.id_quarter= quarterId;}
              if(quarterName){this.count.quarter_name= quarterName;}
              if(seasonId){this.count.id_season= seasonId;}
              if(seasonName){this.count.season_name= seasonName;}
              if(farmId){this.count.id_farm= farmId;}
              if(farmName){this.count.farm_name= farmName;}
              this.count.working_day= this.fileData[i].Jornada; 
              this.count.countscol= this.fileData[i].ControlRealizado;         
              this.count.cant= this.fileData[i].CantidadRacimos;
              this.count.date= moment(this.fileData[i].FechaConteo).format("YYYY-MM-DD HH:mm");           
              this.count.row= this.fileData[i].No_Hilera;
              this.count.plant= this.fileData[i].No_Planta;
              this.count.id_user= 1;
              this.count.registered_in_batch= true;//true          
              this.createCount(this.count);
            }
        }
        if(i+1==this.fileData.length){
          this.modalRefExcelList.close();
        }
        //processElement           
      }
    }
  }
  createCount(count:Count){
    this.count_service.createCount(count).toPromise().then(
      response => {
        this.getEmployees();
        this.counts.push(response.count);
        this.notification_service.showSuccess('Operación Exitosa', response.message);
      }
    ).catch(
      error => {
        this.notification_service.showError('Error',error.error)
      }
    );    
  }
  createNewElement(modalRef:any) {
    return new Promise(resolve => {
      this.modalRef.componentInstance.passEntry.subscribe((receivedEntry)=>{
        resolve(receivedEntry);
      })
    });
  }
  filterCountsByParams() {
    this.filteredCounts = this.counts.filter( currentItem => {
      let filteredItem = null;
      if(this.searching.farm) {
        filteredItem = currentItem.id_farm == this.searching.farm
      }
      if(this.searching.season) {
        filteredItem = filteredItem == null || filteredItem != false ?  currentItem.id_season == this.searching.season : false
      }
      if(this.searching.endDate && this.searching.initialDate) {
        filteredItem = filteredItem == null || filteredItem != false ?  
          currentItem.date >= this.searching.initialDate && currentItem.date <= this.searching.endDate  : 
          false
      }else {
        if(this.searching.initialDate) {
          filteredItem = filteredItem == null || filteredItem != false ?  currentItem.date == this.searching.initialDate : false
        }
      }
      return filteredItem
    })
  }
  deleteRecordsPerBatch(modalRef:any) {
    return new Promise(resolve => {
      this.modalRef.componentInstance.passEntry.subscribe((receivedEntry)=>{
        resolve(receivedEntry);
      })
    });
  }
  getImportDates(){
    this.count_service.getImportDates().toPromise().then(
      response => {
        let dates=[];
        let deleteRecordsPerBatchResult;
        for (var i = 0; i < response.counts.length; i++) {
          dates.push(response.counts[i]["DATE(created_at)"])
          if(i+1 == response.counts.length){
            this.modalRef = this.modalService.open(CountsPerBatchComponent,{ size: "lg"});
            this.modalRef.componentInstance.param={
              dates:dates,
              seasons:this.seasons,
              quarters:this.quarters,
              employees:this.employees,
              farms:this.farms,
              modalRef:this.modalRef
            };            
            this.deleteRecordsPerBatch(this.modalRef).then(
              response=>{
                if(response){
                  this.getCounts();
                }
              }).catch( 
                error => {
                  this.notification_service.showError('Error',error.error)
                }
              );
          }
        }
      }
    ).catch( 
      error => {
        this.notification_service.showError('Error',error.error)
      }
    )
  }
}
