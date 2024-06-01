import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: '' , redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'form' , component: FormComponent },
    { path: 'dashboard' , component: DashboardComponent }

];
