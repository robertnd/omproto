import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainSidebarComponent } from './main-sidebar/main-sidebar.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { DefaultModule } from './layout/default/default.module';
import { LeadsComponent } from './business/crm/leads/leads.component';
import { LeadsNewComponent } from './business/crm/leads-new/leads-new.component';
import { LeadDetailComponent } from './business/crm/lead-detail/lead-detail.component';
import { CustomersComponent } from './business/crm/customers/customers.component';
import { CustomerDetailComponent } from './business/crm/customer-detail/customer-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    MainSidebarComponent,
    MainFooterComponent,
    LeadsComponent,
    LeadsNewComponent,
    LeadDetailComponent,
    CustomersComponent,
    CustomerDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DefaultModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
