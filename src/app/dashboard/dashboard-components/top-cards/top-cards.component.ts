import { Component, OnInit } from '@angular/core';
import {topcard,topcards} from './top-cards-data';

import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html'
})
export class TopCardsComponent implements OnInit {
  totalRegister: number;
  totalRegistros: number;
  topcards:topcard[];

  constructor(private dashboardService:DashboardService) { 

    this.topcards=topcards;
  }

  ngOnInit() {
    this.dashboardService.getTotalRegister().subscribe(
      total => this.totalRegister = total,
      error => console.error(error)
    );

    this.dashboardService.getTotalRegistros().subscribe(
      total => this.totalRegistros = total,
      error => console.error(error)
    );
  }

}
