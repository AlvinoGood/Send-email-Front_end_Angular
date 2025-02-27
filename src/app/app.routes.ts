import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./email-form/email-form.component').then((m) => m.EmailFormComponent),
    }
];
