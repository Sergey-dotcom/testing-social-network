import { Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { DetailsComponent } from './details.component';

export const UsersRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: ListComponent },
            { path: ':id', component: DetailsComponent }
        ]
    }
];
