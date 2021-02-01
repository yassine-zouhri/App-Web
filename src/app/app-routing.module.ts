import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUsersComponent } from './add-users/add-users.component';
import { GrapheInterfaceComponent } from './graphe-interface/graphe-interface.component';
import { InterfaceMapComponent } from './interface-map/interface-map.component';
import { InterfacePublicComponent } from './interface-public/interface-public.component';
import {AdminComponent} from './layout/admin/admin.component';

import { ListUsersComponent } from './list-users/list-users.component';
import { ModifyUserComponent } from './modify-user/modify-user.component';
import { BasicLoginComponent } from './pages/auth/login/basic-login/basic-login.component';
import { TableIncidentComponent } from './table-incident/table-incident.component';

import { ValidateIncidentAdminComponent } from './validate-incident-admin/validate-incident-admin.component';
import { ValidateIncidentProComponent } from './validate-incident-pro/validate-incident-pro.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }, {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard-default/dashboard-default.module').then(m => m.DashboardDefaultModule)
      }, {
        path: 'basic',
        loadChildren: () => import('./pages/ui-elements/basic/basic.module').then(m => m.BasicModule)
      }, {
        path: 'notifications',
        loadChildren: () => import('./pages/ui-elements/advance/notifications/notifications.module').then(m => m.NotificationsModule)
      }, {
        path: 'bootstrap-table',
        loadChildren: () => import('./pages/ui-elements/tables/bootstrap-table/basic-bootstrap/basic-bootstrap.module').then(m => m.BasicBootstrapModule),
      }, {
        path: 'map',
        loadChildren: () => import('./pages/map/google-map/google-map.module').then(m => m.GoogleMapModule),
      }, {
        path: 'user',
        loadChildren: () => import('./pages/user/profile/profile.module').then(m => m.ProfileModule)
      }, {
        path: 'simple-page',
        loadChildren: () => import('./pages/simple-page/simple-page.module').then(m => m.SimplePageModule)
      },{
        path: 'authentication1/login',
        loadChildren: () => import('./pages/auth/login//basic-login/basic-login.module').then(m => m.BasicLoginModule)
      },
      {path: 'basic/listUses', component: ListUsersComponent},
      {path: 'basic/addUsers', component: AddUsersComponent},
      {path: 'listUses', component: ListUsersComponent},
      {path: 'addUsers', component: AddUsersComponent},
      {path: 'basic/InterfaceMap', component:  InterfaceMapComponent },
      {path: 'ModifyUser', component: ModifyUserComponent},
      { path: 'ModifyUser/:id', component:  ModifyUserComponent },
      { path: 'InterfaceMap', component:  InterfaceMapComponent },
      { path: 'PublicInterface', component:  InterfacePublicComponent},
      { path: 'ValiderIncidentPro', component:  ValidateIncidentProComponent},
      { path: 'basic/IncidentTable', component:  TableIncidentComponent},
      { path: 'IncidentTable', component:  TableIncidentComponent},
      { path: 'basic/ValidateIncidentAdmin', component:  ValidateIncidentAdminComponent},
      { path: 'ValidateIncidentAdmin', component:  ValidateIncidentAdminComponent},
      { path: 'InterfaceGraphe', component: GrapheInterfaceComponent},
      { path: 'basic/InterfaceGraphe', component: GrapheInterfaceComponent}
    ]
  },
  {path:'login',component:BasicLoginComponent},
  
  
 
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
