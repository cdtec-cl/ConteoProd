import { Component, OnInit } from '@angular/core';
import { CountService } from 'src/app/services/count.service';
import { Router } from '@angular/router';
import { FarmService } from 'src/app/services/farm.service';
import { QuarterService } from 'src/app/services/quarter.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { SeasonService } from 'src/app/services/season.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import * as XLSX from 'xlsx'; 
import * as FileSaver from 'file-saver';
import { element } from '@angular/core/src/render3';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-tables-report',
  templateUrl: './tables-report.component.html',
  styleUrls: ['./tables-report.component.scss']
})
export class TablesReportComponent implements OnInit {

  public counts = [];
  public filteredCounts = [];
  public farms = [];
  public employees = [];
  public quarters = [];
  public seasons = [];
  data: Array<any>;

  public searching = {
    'farm': '',
    'season': '',
    'initialDate': '',
    'endDate': ''
  };
  
  buttonMessage = 'Exportar';
  buttonIcon = 'ni ni-cloud-download-95';
  searhcButtonIcon = 'ni ni-zoom-split-in'
  searhcButtonMessage = 'Buscar'
  page = 1
  
  constructor(
    private count_service: CountService, 
    private employee_service: EmployeeService, 
    private season_service: SeasonService, 
    private farm_service: FarmService, 
    private quarter_service: QuarterService,  
    private router: Router,
    private notification_service: NotificationService,
    private spinner_service: SpinnerService
  ) { }

  ngOnInit() {
    this.spinner_service.show()
    this.farm_service.getFarms().toPromise().then(
      response => {
        this.farms = response.farms
      }
    ).catch( 
      error => {
        this.notification_service.showError('Error',error.error)
      }
    )

    this.employee_service.getEmployees().toPromise().then(
      response => {
        this.employees = response.empleados
      }
    ).catch( 
      error => {
        this.notification_service.showError('Error',error.error)
      }
    )

    this.quarter_service.getQuarters().toPromise().then(
      response => {
        this.quarters = response.quarters
      }
    ).catch( 
      error => {
        this.notification_service.showError('Error',error.error)
      }
    )

    this.season_service.getSeasons().toPromise().then(
      response => {
        this.seasons = response.seasons
      }
    ).catch( 
      error => {
        this.notification_service.showError('Error',error.error)
      }
    )

    this.count_service.getCounts().toPromise().then(
      response => {
        this.spinner_service.close()
        this.counts = response.counts;
        this.filteredCounts = this.counts;
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
        this.notification_service.showSuccess('Operación Exitosa', response.message)
      }
    ).catch(
      error =>{
        this.spinner_service.close()
        this.notification_service.showError('Error',error.error)
      }
    )
  }

  filter(array, searchItem){
    let filterArray = array.filter( currentItem => currentItem.id == searchItem)
    return filterArray[0].name

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

  exportexcel(): void 
  {
    console.log(this.filteredCounts);
    console.log(this.employees);
    console.log(this.quarters);

    
     this.data=new Array();
     var data;
     var indexemployees;
     var indexquarter;
     this.filteredCounts.forEach(element => {
      indexemployees= this.employees.findIndex(employees => employees.id === element.id_employee);
      indexquarter= this.quarters.findIndex(quarters => quarters.id === element.id_quarter);
      data = {        
          Empleado: this.employees[indexemployees].name,
          Jornada: element.countscol,
          Cuartel: this.quarters[indexquarter].name,
          Hilera: element.row,
          Planta: element.plant,
          Cant_R: element.cant,
          Obj_R: element.obj,
          Dif_R: element.diff
        }
        this.data.push(data);
     });
    this.exportAsExcelFile(this.data, 'Listado-Conteos');
        
  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
     FileSaver.saveAs(data, fileName +new  Date()+EXCEL_EXTENSION);
  }
  
}
