import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    {
        path: 'dashboard',
        loadComponent: () => import('./task-mgr/dashboard/dashboard').then(c => c.DashboardComponent)
    },
    {
        path: 'add-task',
        loadComponent: () => import('./task-mgr/add-task/add-task').then(c => c.AddTaskComponent)
    }
];