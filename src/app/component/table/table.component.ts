import { Component } from '@angular/core';
import { Product, TopSelling, TableRows, Employee } from './table-data';
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
  selector: 'app-table',
  standalone: true,
  imports:[NgFor,NgbDropdownModule,NgbModule,NgbCollapseModule,NgbPaginationModule,NgIf],
  templateUrl: 'table.component.html'
})
export class TableComponent {
  topSelling: Product[];

  trow: TableRows[];
  now:any;

  constructor() {

    this.topSelling = TopSelling;

    this.trow = Employee;
    this.now= new Date();
  }

    // This is for the collapse example
    public isCollapsed = false;
    public isCollapsed2 = false;
  
    collapsed = true;

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
