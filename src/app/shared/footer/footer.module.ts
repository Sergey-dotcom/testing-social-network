import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule} from '@ngx-translate/core';

import { MaterialModule } from 'src/app/material.module';

import { FooterComponent } from './footer.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        MaterialModule,
        TranslateModule
    ],
    declarations: [ FooterComponent ],
    exports: [ FooterComponent ]
})

export class FooterModule {}
