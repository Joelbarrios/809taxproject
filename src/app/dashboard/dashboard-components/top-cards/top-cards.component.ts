import { Component, OnInit } from '@angular/core';
import {topcard,topcards} from './top-cards-data';

import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html'
})
export class TopCardsComponent implements OnInit {
  totalRegister: number;
  totalRegistrosArchivados: number;
  totalRegistrosNoArchivados: number;
  totalRegisterArchived:number;
  totalRegisterNotArchived:number;
  topcards:topcard[];

  constructor(private dashboardService:DashboardService) { 

    this.topcards=topcards;
  }

  ngOnInit() {
    this.dashboardService.getTotalRegister().subscribe(
      total => this.totalRegister = total,
      error => console.error(error)
    );

    //english
    this.dashboardService.getTotalRegisterArchived().subscribe(
      total => this.totalRegisterArchived = total,
      error => console.error(error)
    );

    this.dashboardService.getTotalRegistrosNoArchivados().subscribe(
      total => this.totalRegisterNotArchived = total,
      error => console.error(error)
    );

    //espanol
    this.dashboardService.getTotalRegistrosArchivados().subscribe(
      total => this.totalRegistrosArchivados = total,
      error => console.error(error)
    );

    this.dashboardService.getTotalRegistrosNoArchivados().subscribe(
      total => this.totalRegistrosNoArchivados = total,
      error => console.error(error)
    );
  }

}
