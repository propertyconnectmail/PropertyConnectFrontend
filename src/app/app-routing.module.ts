import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { ProfessionalComponent } from './screens/professional/professional.component';
import { ProfessionalAddComponent } from './screens/professional-add/professional-add.component';
import { LoginComponent } from './auth/login/login.component';
import { ClientComponent } from './screens/client/client.component';
import { ClientCrudComponent } from './screens/client-crud/client-crud.component';
import { EmployeeComponent } from './screens/employee/employee.component';
import { EmployeeCrudComponent } from './screens/employee-crud/employee-crud.component';
import { RegistryComponent } from './screens/registry/registry.component';
import { RegistryCrudComponent } from './screens/registry-crud/registry-crud.component';
import { OfficialComponent } from './screens/official/official.component';
import { OfficialCrudComponent } from './screens/official-crud/official-crud.component';
import { LogsComponent } from './screens/logs/logs.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'professional', component: ProfessionalComponent },
  { path: 'professional/:mode', component: ProfessionalAddComponent },
  { path: 'professional/:mode/:id', component: ProfessionalAddComponent },
  { path: 'client', component: ClientComponent },
  { path: 'client/:mode', component: ClientCrudComponent },
  { path: 'client/:mode/:id', component: ClientCrudComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'employee/:mode', component: EmployeeCrudComponent },
  { path: 'employee/:mode/:id', component: EmployeeCrudComponent },
  { path: 'registry', component: RegistryComponent },
  { path: 'registry/:mode', component: RegistryCrudComponent },
  { path: 'registry/:mode/:id', component: RegistryCrudComponent },
  { path: 'official', component: OfficialComponent },
  { path: 'official/:mode', component: OfficialCrudComponent },
  { path: 'official/:mode/:id', component: OfficialCrudComponent },
  { path: 'log', component: LogsComponent },
  // Optionally:
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
