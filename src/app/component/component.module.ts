import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { TableComponent } from "./table/table.component";
import {NgxPaginationModule, PaginationControlsComponent} from 'ngx-pagination'; 
import { FormsModule } from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ArchivedFormComponent } from './archived/archived-form/archived-form.component';
import { FormDetailComponent } from './form-detail/form-detail.component';
import { TableSpanishComponent } from './table-spanish/table-spanish.component';
import { ArchivedEsComponent } from './archivedEs/archived-es/archived-es.component';







@NgModule({

  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    NgbModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
    
  ],

  declarations: [
      ArchivedFormComponent,
      FormDetailComponent,
      TableSpanishComponent,
      ArchivedEsComponent

  ]



})
export class ComponentsModule { }
