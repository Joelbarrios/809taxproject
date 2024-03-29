import { Routes } from '@angular/router';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { CardsComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { ArchivedFormComponent } from './archived/archived-form/archived-form.component';
import { FormDetailComponent } from './form-detail/form-detail.component';
import { TableSpanishComponent } from './table-spanish/table-spanish.component';
import { ArchivedEsComponent } from './archivedEs/archived-es/archived-es.component';
import { FormDetailEsComponent } from './form-detail-es/form-detail-es/form-detail-es.component';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'table',
				component: TableComponent
			},
			{
				path: 'table-es',
				component: TableSpanishComponent
			},
			{
				path: 'form/:id',
				component: FormDetailComponent
			},
			{
				path: 'form-es/:id',
				component: FormDetailEsComponent
			},
			{
				path: 'archived',
				component: ArchivedFormComponent
			},
			{
				path: 'archived-es',
				component: ArchivedEsComponent
			}
		]
	}
];
