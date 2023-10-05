import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailComponent } from './business/crm/customer-detail/customer-detail.component';
import { CustomersImComponent } from './business/crm/customers-im/customers-im.component';
import { CustomersComponent } from './business/crm/customers/customers.component';
import { LeadDetailComponent } from './business/crm/lead-detail/lead-detail.component';
import { LeadsImComponent } from './business/crm/leads-im/leads-im.component';
import { LeadsNewComponent } from './business/crm/leads-new/leads-new.component';
import { LeadsComponent } from './business/crm/leads/leads.component';
import { ProductDetailComponent } from './business/crm/product-detail/product-detail.component';
import { ProductsNewComponent } from './business/crm/products-new/products-new.component';
import { ProductsComponent } from './business/crm/products/products.component';
import { AdvisorDetailComponent } from './intermed/advisor-detail/advisor-detail.component';
import { AdvisorsNewComponent } from './intermed/advisors-new/advisors-new.component';
import { AdvisorsComponent } from './intermed/advisors/advisors.component';
import { HomeComponent } from './layout/home/home.component';
import { SteptstComponent } from './business/crm/steptst/steptst.component';
import { PlanSelectionComponent } from './business/crm/plan-selection/plan-selection.component';

const routes: Routes = [
  { path: '', component: HomeComponent, children: [] },
  { path: 'business/crm/testfunc', component: SteptstComponent, children: [] },
  { path: 'business/crm/planselect', component: PlanSelectionComponent, children: [] },
  { path: 'business/crm/customers/detail', component: CustomerDetailComponent, children: [] },
  { path: 'business/crm/customers-im', component: CustomersImComponent, children: [] },
  { path: 'business/crm/customers', component: CustomersComponent, children: [] },
  { path: 'business/crm/leads/new', component: LeadsNewComponent, children: [] },
  { path: 'business/crm/leads/detail', component: LeadDetailComponent, children: [] },
  { path: 'business/crm/leads', component: LeadsComponent, children: [] },
  { path: 'business/crm/leads-im', component: LeadsImComponent, children: [] },
  { path: 'business/crm/products/new', component: ProductsNewComponent, children: [] },
  { path: 'business/crm/products', component: ProductsComponent, children: [] },
  { path: 'business/crm/product/detail', component: ProductDetailComponent, children: [] },
  { path: 'intermed/advisors', component: AdvisorsComponent, children: [] },
  { path: 'intermed/advisor/detail', component: AdvisorDetailComponent, children: [] },
  { path: 'intermed/advisors/new', component: AdvisorsNewComponent, children: [] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
