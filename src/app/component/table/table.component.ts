import { Component, OnInit  } from '@angular/core';
import { Product, TopSelling, TableRows, Employee } from './table-data';
import { NgFor } from '@angular/common';
import {
  NgbDropdownModule,
  NgbModule,
  NgbCollapseModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination'; // At the top of your module
import { NgIf } from '@angular/common';
import { Form2023enService } from 'src/app/homePage/form2023en/form2023enService';
import {Router, ActivatedRoute} from '@angular/router';
import { FormGroup,FormBuilder, Validators, FormControl} from '@angular/forms';


const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-table',
  standalone: true,
  imports:[NgFor,NgbDropdownModule,NgbModule,NgbCollapseModule,NgxPaginationModule,NgIf],
  templateUrl: 'table.component.html'
})
export class TableComponent {
  
  topSelling: Product[];
  formData: any = [];
  trow: TableRows[];
  now:any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];

  filteredData: any[] = [];
  searchText = '';

  constructor(private fb:FormBuilder,private formService:Form2023enService
    , private router:Router) {

    this.topSelling = TopSelling;

    this.trow = Employee;
    this.now= new Date();
  }
  

    // This is for the collapse example
    public isCollapsed = false;
    public isCollapsed2 = false;
  
    collapsed = true;

    //pagination
    page2 = 1;
    currentPage = 1;
    page3 = 4;
  
    //   disabled
    page4 = 3;
    isDisabled = true;

    ngOnInit(){
      this.getAllForms();

      
     
    }

    getAllForms(): void {
      this.formService.getForms().subscribe(
        (response) => {
          this.formData = response;
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
   
    onTableDataChange(event: any) {
      this.page = event;
      this.getAllForms();
    }
    onTableSizeChange(event: any): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.getAllForms();
    }

  
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
