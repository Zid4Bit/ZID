import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerUpdateComponent } from './customer-update/customer-update.component';

const routes: Routes = [
  { path: 'customer', component: CustomerListComponent },
  { path: 'createcustomer', component: CustomerFormComponent },
  { path: 'details/:id', component: CustomerUpdateComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
