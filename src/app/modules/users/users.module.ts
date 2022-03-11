import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NamePipe } from 'src/app/pipes/name.pipe';
import { StatusDirective } from 'src/app/directives/status.directives';
import { SpecialCharacterDirective } from 'src/app/directives/specialCharacter.directives';

import { UsersRoutes } from './users.routing';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { DetailsComponent } from './details.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UsersRoutes),
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        TranslateModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        DetailsComponent,
        NamePipe,
        StatusDirective,
        SpecialCharacterDirective
    ]
})
export class UsersModule { }
