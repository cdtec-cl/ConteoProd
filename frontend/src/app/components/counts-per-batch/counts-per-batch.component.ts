import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { CountService } from 'src/app/services/count.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SpinnerService } from 'src/app/services/spinner.service';
// elements
import {
  datesConfigObj,
} from "./selectsconfigs/configs";
import * as moment from "moment";
@Component({
  selector: 'app-counts-per-batch',
  templateUrl: './counts-per-batch.component.html',
  styleUrls: ['./counts-per-batch.component.scss']
})
export class CountsPerBatchComponent implements OnInit {

  @Input() param: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  public counts = [];
  public filteredCounts = [];
  public farms = [];
  public employees = [];
  public quarters = [];
  public seasons = [];
  datesConfig = datesConfigObj;
  dates: Array<any> = [];
  datesSelected: any=null;

  checkboxes: boolean[];
  selectedAll:boolean=false;
  buttonMessage:string='Eliminar seleccionados';
  modalRef:any=null;
  constructor(
  	private count_service: CountService,  
    private notification_service: NotificationService,
    private spinner_service: SpinnerService) { }

  ngOnInit() {
  	this.dates=[];
  	for (var i = 0; i < this.param.dates.length; i++) {
  		this.dates = [...this.dates, {id:this.param.dates[i],date:this.param.dates[i]}];
    }
    this.seasons=this.param.seasons;
    this.quarters=this.param.quarters;
    this.employees=this.param.employees;
    this.farms=this.param.farms;
    this.modalRef=this.param.modalRef;
    
     
  }
  
  selectionChanged(event){
    if(event.value){
    	this.spinner_service.show();
    	this.count_service.getRecordsPerBatch({date:moment(event.value.date).format("YYYY-MM-DD")}).toPromise().then(
	      response => {
	        this.spinner_service.close()
	        this.counts=response.counts;
        	this.filteredCounts = this.counts.reverse();
          this.checkboxes = new Array(this.counts.length);
          this.checkboxes.fill(false);
	      }
	    ).catch( 
	      error => {
	        this.spinner_service.close()
	        this.notification_service.showError('Error',error.error)
	      }
	    )
    }else{
    	this.filteredCounts=[];
    	this.counts=[];
    }

  }
  filter(array, search_item, elements){
    let filter_array;
    switch (elements) {
      case "employees":
        filter_array = array.filter( current_item => current_item.rut == search_item );
        break;
      case "counts":
        filter_array = array.filter( current_item =>{
          return current_item.employee_rut.toLowerCase() == search_item.RutEmpleado.toLowerCase() && 
          current_item.season_name.toLowerCase() == search_item.NombreTemporada.toLowerCase() && 
          current_item.quarter_name.toLowerCase() == search_item.NombreCuartel.toLowerCase() && 
          current_item.working_day.toLowerCase() == search_item.Jornada.toLowerCase() && 
          current_item.cant == search_item.CantidadRacimos && 
          current_item.date == moment(search_item.Fecha).format("YYYY-MM-DD") &&
          parseInt(current_item.row) == search_item.IDHilera &&
          parseInt(current_item.plant) == search_item.IDPlanta;
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
  toggleSelection(event, i) {
    this.checkboxes[i] = !this.checkboxes[i];
  }
  selectAll(event){
    this.selectedAll=!this.selectedAll;
    for (var i = this.checkboxes.length - 1; i >= 0; i--) {
      this.checkboxes[i] = this.selectedAll;
    }
  }
  disabledDeleteBtn(){
    if(this.counts.length>0){
      for (var i = this.checkboxes.length - 1; i >= 0; i--) {
        if(this.checkboxes[i]){
          return false;
        }
      }
      return true;
    }else{
      return true;
    }    
  }
  deleteSelected(){
    let deleteElementsIds=[];
    for (var i = this.checkboxes.length - 1; i >= 0; i--) {
      if(this.checkboxes[i]){
        deleteElementsIds.push(this.filteredCounts[i].id);
      }
    }
    this.spinner_service.show();
      this.count_service.deleteRecordsPerBatch({deleteElementsIds:deleteElementsIds}).toPromise().then(
        response => {
          this.spinner_service.close()
          this.notification_service.showSuccess('Operación Exitosa', response.message);
          this.passEntry.emit(true);
          this.modalRef.close();
        }
      ).catch( 
        error => {
          this.spinner_service.close()
          this.notification_service.showError('Error',error.error)
        }
      )
  }
}
