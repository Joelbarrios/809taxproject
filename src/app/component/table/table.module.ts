import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { SearchPipe } from './search.pipe';



@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule
  ],
  exports:[
    TableComponent,
    SearchPipe
  ]
})
export class TableModule { }
