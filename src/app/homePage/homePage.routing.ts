import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { Form2023enComponent } from './form2023en/form2023en.component';
import { Form2023esComponent } from './form2023es/form2023es.component';




export const HomePageComponentRoutes: Routes = [
	{
		path: '',
		children: [
            
			{
				path: 'form',
				component: Form2023enComponent
			},
			{
				path: 'form-es',
				component: Form2023esComponent
			}
		]
	}
];
