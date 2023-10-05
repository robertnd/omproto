import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SDashboardComponent } from './layout/supervisor/s-dashboard/s-dashboard.component';
import { DashboardsComponent } from './layout/dashboards/dashboards.component';
import { IDashboardComponent } from './layout/intermed/i-dashboard/i-dashboard.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { TestComponent } from './business/crm/test/test.component';
import { LoginComponent } from './auth/login/login.component';
import { httpInterceptorProviders } from './helpers/http.interceptor';
import { SampooComponent } from './auth/sampoo/sampoo.component';
import { HomeComponent } from './layout/home/home.component';
import { CustomerDetailComponent } from './business/crm/customer-detail/customer-detail.component';
import { CustomersComponent } from './business/crm/customers/customers.component';
import { CustomersImComponent } from './business/crm/customers-im/customers-im.component';
import { LeadDetailComponent } from './business/crm/lead-detail/lead-detail.component';
import { LeadsComponent } from './business/crm/leads/leads.component';
import { LeadsImComponent } from './business/crm/leads-im/leads-im.component';
import { LeadsNewComponent } from './business/crm/leads-new/leads-new.component';
import { ProductDetailComponent } from './business/crm/product-detail/product-detail.component';
import { ProductsComponent } from './business/crm/products/products.component';
import { ProductsNewComponent } from './business/crm/products-new/products-new.component';
import { AdvisorDetailComponent } from './intermed/advisor-detail/advisor-detail.component';
import { AdvisorsComponent } from './intermed/advisors/advisors.component';
import { AdvisorsNewComponent } from './intermed/advisors-new/advisors-new.component';
import { SteptstComponent } from './business/crm/steptst/steptst.component';
import { PlanSelectionComponent } from './business/crm/plan-selection/plan-selection.component'

@NgModule({
  declarations: [
    AppComponent,
    SDashboardComponent,
    DashboardsComponent,
    IDashboardComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    TestComponent,
    LoginComponent,
    SampooComponent,
    HomeComponent,
    CustomerDetailComponent,
    CustomersComponent,
    CustomersImComponent,
    LeadDetailComponent,
    LeadsComponent,
    LeadsImComponent,
    LeadsNewComponent,
    ProductDetailComponent,
    ProductsComponent,
    ProductsNewComponent,
    AdvisorDetailComponent,
    AdvisorsComponent,
    AdvisorsNewComponent,
    SteptstComponent,
    PlanSelectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
