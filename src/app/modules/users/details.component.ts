import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user.model';

@Component({
    templateUrl: 'details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
    id: string;
    details: User;
    educationsColumns: string[] = ['type', 'specialization', 'title', 'education_start', 'education_end'];

    constructor(
        private route: ActivatedRoute,
        private usersService: UsersService,
        private translate: TranslateService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        this.usersService.getById(this.id)
            .pipe(first())
            .subscribe(data => this.details = data);
    }
}