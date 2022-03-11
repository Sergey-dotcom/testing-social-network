import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from 'src/app/material.module';

import { HeaderComponent } from './header.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        MaterialModule,
        TranslateModule
    ],
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
})

export class HeaderModule { }
