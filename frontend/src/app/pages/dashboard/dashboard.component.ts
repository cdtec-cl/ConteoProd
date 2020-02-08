import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

import { SeasonService } from 'src/app/services/season.service';
import { FarmService } from 'src/app/services/farm.service';
import { QuarterService } from 'src/app/services/quarter.service';
import { CountService } from 'src/app/services/count.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SpinnerService } from 'src/app/services/spinner.service';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample2
} from "../../variables/charts";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public salesChartEmployee;
  public clicked: boolean = true;
  public clicked1: boolean = false;  

  public posicion;

  public counts = [];
  public countsAll = [];
  public countsAllEmployee = [];
  public filteredCounts = [];
  public farms = [];
  public employees = [];
  public quarters = [];
  public seasons = [];

  public id_farm;
  public id_user;
  private id_quarters;
  public id_seasons;

  public seleccionado;
  public seleccionadoSeasons;
  public seleccionadoQuarter;
  public searching = {
    'farm': '',
    'season': '',
    'initialDate': '',
    'endDate': ''
  };
  buttonMessage = 'Actualizar';
  buttonIcon = 'fa fa-refresh';
  page = 1;

  public user;

  public farm_card; 
  public quarter_card;
  public employee_card;

 public chartLine:any ;
 public chartLineEmployee:any ;

  constructor(
    private count_service: CountService, 
    private season_service: SeasonService, 
    private farm_service: FarmService, 
    private spinner_service: SpinnerService,
    private quarter_service: QuarterService, 
    private notification_service: NotificationService,
  ) {     
    this.getUser();   
  }

  getUser(){
    this.user = JSON.parse(localStorage.getItem('user'));
    this.id_user=this.user['user'].id;
   }

  async getFarm(){

    this.farm_service.getFarms().toPromise().then(
      response => {
        this.farms = response.farms;
        this.seleccionado=this.farms[0].id;
        this.id_farm=this.farms[0].id;
        this.getCuarters();
      }
    ).catch( 
      error => {
        this.notification_service.showError('Error',error.error)
      }
    )
  }

  async getCuarters(){
    this.quarter_service.getQuarters().toPromise().then(
      response => {
        this.quarters = response.quarters;
        this.seleccionadoQuarter=this.quarters[0].id;
        this.id_quarters=this.quarters[0].id;
        this.getSeason();
      }
    ).catch( 
      error => {
        this.notification_service.showError('Error',error.error)
      }
    )
  }

  async getSeason(){
    this.season_service.getSeasons().toPromise().then(
      response => {
        this.seasons = response.seasons;
        this.seleccionadoSeasons=this.seasons[0].id;
        this.id_seasons=this.seasons[0].id;
        this.getCount();
      }
    ).catch( 
      error => {
        this.notification_service.showError('Error',error.error)
      }
    )
  }

  async getCount(){    
    let farm=this.id_farm ? this.id_farm: '';
    let quarter=this.id_quarters ? this.id_quarters: '';
    let season=this.id_seasons ? this.id_seasons: '';
    this.count_service.getCountsDashboard(farm,quarter,season).toPromise().then(
      response => {
        this.countsAll=response.counts;  
        this.countsAllEmployee=response.employees;

        this.employee_card=response.employee_res;
        this.farm_card=response.farms;
        this.quarter_card=response.quarter;
        
        this.posicion=response.posicion[0].suma;       
        this.setChartLine();
        this.setChartLineEmployee();
      }
    ).catch( 
      error => {
        console.log("error:",error);
        this.notification_service.showError('Error',error.error)
      }
    )
  }

  ngOnInit() {

   // this.setChartLine();

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    /*var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });*/
     this.getFarm(); 
    // this.getCuarters();
    // this.getSeason();
    // this.getCount();
  
  }

  setChartLine(){

    let fechas=[];
    let deseados=[]; 
    let prome_diario=[]; 
    let acum_diario=[]; 
    let prome =0;
    let acum=0;
    
    for (let cont of  this.countsAll) {
      
      
      prome=Math.round(cont[0].suma/cont[0].contar);

      if(acum==0){
        acum = prome;      
      }else{
        acum=Math.round((acum+prome)/2);
      }   
      
      fechas.push(cont[0].day+'-'+cont[0].mon);
      deseados.push(cont[0].deseado);
      prome_diario.push(prome);
      acum_diario.push(acum);

      
    } 
    

    this.chartLine= {
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            gridLines: {
              color: '#e9ecef',
              zeroLineColor: '#e9ecef'
            },
            ticks: {
              callback: function(value) {
                if (!(value % 10)) {
                  return ''+value ;
                }
              }
            }
          }]
        }, 
        
      },
      data: {           
        labels:fechas,
        datasets: [{
          label: 'Racimos Deseados',
          data: deseados,
          borderColor: '#cb3837',
          backgroundColor:'#cb3837',  
          borderWidth:5,
          fill: false,
        }, 
        {
          label: 'Promedio Diario',
          data: prome_diario,
          borderColor: '#3537CB',
          backgroundColor:'#3537CB',          
          borderWidth:5,
          fill: false,
        },
        {
          label: 'Promedio Acumulado',
          data: acum_diario,
          borderColor: '#11cdef',
          borderWidth:5,
          backgroundColor:'#11cdef',          
          fill: false,
        }]
      }
    }

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: this.chartLine.options,
			data: this.chartLine.data
		});

  }

  setChartLineEmployee(){
    let conts=[];
    let fechas=[];
    let deseados=[]; 
    let prome_diario=[]; 
    let acum_diario=[]; 
    let prome =0;
    let acum=0;
    let datasetar=new Array();



    for (let cont of  this.countsAll) {     
      fechas.push(cont[0].day+'-'+cont[0].mon);
      
    } 
    
    for (let cont of  this.countsAllEmployee) {  
      
      

      let sum=new Array();

      for(let datecont of  cont.count){
        
        sum.push(Math.round(datecont[0].suma/datecont[0].contar)  )
      
      }

      datasetar.push({
        label: cont.employee,
        data: sum,
        borderColor: '#cb3837',
        backgroundColor:'#cb3837',  
        borderWidth:5,
        fill: false,

      })
      
  
      
    } 


    this.chartLineEmployee= {
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            gridLines: {
              color: '#e9ecef',
              zeroLineColor: '#e9ecef'
            },
            ticks: {
              callback: function(value) {
                if (!(value % 10)) {
                  return ''+value ;
                }
              }
            }
          }]
        }, 
        
      },
      data: {           
        labels:fechas,
        datasets: datasetar
      }
    }

    var chartSalesEmployee = document.getElementById('chart-salesemployee');

    this.salesChartEmployee = new Chart(chartSalesEmployee, {
			type: 'line',
			options: this.chartLineEmployee.options,
			data: this.chartLineEmployee.data
		});

  }

  
  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  public updateData(){
    this.spinner_service.show()
    let farm=this.seleccionado;
    let quarter=this.seleccionadoQuarter;
    let season=this.seleccionadoSeasons;
        
    this.count_service.getCountsDashboard(farm,quarter,season).toPromise().then(
      response => {
        this.spinner_service.close();        
        this.countsAllEmployee=response.employees;
        this.countsAll=response.counts;  
        this.posicion=response.posicion[0].suma;       
        this.employee_card=response.employee_res;
        this.farm_card=response.farms;
        this.quarter_card=response.quarter;
        this.setChartLine();
        this.setChartLineEmployee();
      }
    ).catch( 
      error => {
        this.spinner_service.close()
        this.notification_service.showError('Error',error.error)
      }
    )
    

  }

}
