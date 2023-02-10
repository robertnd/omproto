import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailComponent } from './business/crm/customer-detail/customer-detail.component';
import { CustomersComponent } from './business/crm/customers/customers.component';
import { LeadDetailComponent } from './business/crm/lead-detail/lead-detail.component';
import { LeadsNewComponent } from './business/crm/leads-new/leads-new.component';
import { LeadsComponent } from './business/crm/leads/leads.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { DefaultComponent } from './layout/default/default.component';

const routes: Routes = [
  { path: '', component: DefaultComponent, children: [{ path: '', component: DashboardComponent}] },
  { path: 'business/crm/customers/detail', component: CustomerDetailComponent, children: [] },
  { path: 'business/crm/customers', component: CustomersComponent, children: [] },
  { path: 'business/crm/leads/new', component: LeadsNewComponent, children: [] },
  { path: 'business/crm/leads/detail', component: LeadDetailComponent, children: [] },
  { path: 'business/crm/leads', component: LeadsComponent, children: [] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
