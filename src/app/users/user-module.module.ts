import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { UsersRoutes } from './users.routing';
import { UsersComponent } from './users/users.component';





@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UsersRoutes),
    UsersComponent

  ],
  exports:[RouterModule]
})
export class UserModuleModule { }
