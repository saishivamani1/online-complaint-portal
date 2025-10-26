import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ComplaintFormComponent } from './components/complaint-form/complaint-form.component';
import { ComplaintDetailComponent } from './components/complaint-detail/complaint-detail.component';
import { ComplaintListComponent } from './components/complaint-list/complaint-list.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },     // public landing
  { path: 'login', component: LoginComponent },             // public
  { path: 'register', component: RegisterComponent },       // public
  { path: 'new', component: ComplaintFormComponent, canActivate: [AuthGuard] },
  { path: 'complaints/:id', component: ComplaintDetailComponent, canActivate: [AuthGuard] },
  { path: 'my', component: ComplaintListComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
