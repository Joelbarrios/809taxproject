import { Component } from '@angular/core';
import { user } from './user-info';
import { User } from '../user';
import { NgFor } from '@angular/common';
import {
  NgbDropdownModule,
  NgbModule,
  NgbCollapseModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';

const FILTER_PAG_REGEX = /[^0-9]/g;


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  imports:[NgFor,NgbDropdownModule,NgbModule,NgbCollapseModule,NgbPaginationModule,NgIf],
  standalone: true,
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

   users:User[]=[];
   now:any;

  constructor() {

    this.users= user;

  }

  //pagination
  page = 2;
  page2 = 1;
  currentPage = 1;
  page3 = 4;

  //   disabled
  page4 = 3;
  isDisabled = true;

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }

  //   custom links
  page5 = 4;

  getPageSymbol(current: number) {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G'][current - 1];
  }

  selectPage(page: string) {
    this.page5 = parseInt(page, 10) || 1;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
   }


}
