import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from 'src/app/material.module';

import { AdminRoutes } from './admin.routing';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { DeleteConfirmationDialog } from './delete-confirmation.dialog';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(AdminRoutes),
        MaterialModule,
        TranslateModule,
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent,
        DeleteConfirmationDialog,
    ]
})
export class AdminModule { }
