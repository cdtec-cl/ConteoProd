import { Component, OnInit } from '@angular/core';
import { SeasonService } from 'src/app/services/season.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-tables-season',
  templateUrl: './tables-season.component.html',
  styleUrls: ['./tables-season.component.scss']
})
export class TablesSeasonComponent implements OnInit {

  public seasons = [];
  buttonMessage = 'Nueva Temporada';
  buttonIcon = 'ni ni-fat-add';
  page = 1

  constructor(
    private season_service: SeasonService, 
    private router: Router,
    private notification_service: NotificationService,
    private spinner_service: SpinnerService
  ) { }

  ngOnInit() {

    this.spinner_service.show()
    this.season_service.getSeasons().toPromise().then(
      response => {
        this.spinner_service.close()
        this.seasons = response.seasons
      }
    ).catch( 
      error => {
        this.spinner_service.close()
        this.notification_service.showError('Error',error.error)
      }
    )
  }

  toEdit(id){
    this.router.navigate([`/form-temporada/${id}`])
  }

  detail(){

  }

  delete(id){
    this.spinner_service.show()
    this.season_service.deleteSeason(id).toPromise().then(
      response => {
        this.spinner_service.close()
        this.seasons = this.seasons.filter(season_from_list => season_from_list.id !== id)
        this.notification_service.showSuccess('Operación Exitosa', response.message)
      }
    ).catch(
      error =>{
        this.spinner_service.close()
        this.notification_service.showError('Error',error.error)
      }
    )
  }

}
