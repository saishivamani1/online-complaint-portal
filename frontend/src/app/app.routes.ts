import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ComplaintFormComponent } from './components/complaint-form/complaint-form.component';
import { ComplaintDetailComponent } from './components/complaint-detail/complaint-detail.component';
import { ComplaintListComponent } from './components/complaint-list/complaint-list.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: ComplaintListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'new', component: ComplaintFormComponent, canActivate: [AuthGuard] },
  { path: 'complaints/:id', component: ComplaintDetailComponent, canActivate: [AuthGuard] },
  { path: 'my', component: ComplaintListComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
