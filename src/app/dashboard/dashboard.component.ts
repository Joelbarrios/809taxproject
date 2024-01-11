import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
//declare var require: any;

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {
  subtitle: string;
  constructor(public authService: AuthService) {
    this.subtitle = 'This is some text within a card block.';
  }

  ngAfterViewInit() { }
}
