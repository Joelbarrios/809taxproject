import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { HomePageComponentRoutes } from './homePage.routing';
import { HomePageComponent } from './home-page/home-page.component';
import { Form2023enComponent } from './form2023en/form2023en.component';
import { Form2023esComponent } from './form2023es/form2023es.component';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { FormSummitedComponent } from './formSummited/form-summited/form-summited.component';
import { NoFoundComponent } from './noFoundPage/no-found/no-found.component';


@NgModule({
  declarations: [ 
    
    HomePageComponent, Form2023enComponent, Form2023esComponent, FormSummitedComponent, NoFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HomePageComponentRoutes),
    FormsModule,
    ReactiveFormsModule,


    
  ],
  
})
export class HomePageModule { }
