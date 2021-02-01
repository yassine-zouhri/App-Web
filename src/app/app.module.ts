import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { BreadcrumbsComponent } from './layout/admin/breadcrumbs/breadcrumbs.component';
import { TitleComponent } from './layout/admin/title/title.component';

import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListUsersComponent } from './list-users/list-users.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { BasicLoginComponent } from './pages/auth/login/basic-login/basic-login.component';
import { UserService } from './Service/UserService';
import { ModifyUserComponent } from './modify-user/modify-user.component';
import { InterfaceMapComponent } from './interface-map/interface-map.component';
import { MapService } from './Service/MapService';
import { InterfacePublicComponent } from './interface-public/interface-public.component';
import { LoginService } from './Service/LoginService';
import { ValidateIncidentProComponent } from './validate-incident-pro/validate-incident-pro.component';
import { TableIncidentComponent } from './table-incident/table-incident.component';
import { ValidateIncidentAdminComponent } from './validate-incident-admin/validate-incident-admin.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AngularPaginatorModule } from 'angular-paginator';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GrapheInterfaceComponent } from './graphe-interface/graphe-interface.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    BreadcrumbsComponent,
    TitleComponent,
    ListUsersComponent,
    AddUsersComponent,
    BasicLoginComponent,
    ModifyUserComponent,
    InterfaceMapComponent,
    InterfacePublicComponent,
    ValidateIncidentProComponent,
    TableIncidentComponent,
    ValidateIncidentAdminComponent,JwPaginationComponent, GrapheInterfaceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule,NgxPaginationModule,AngularPaginatorModule,
    NgbModule

   
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [UserService,MapService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
