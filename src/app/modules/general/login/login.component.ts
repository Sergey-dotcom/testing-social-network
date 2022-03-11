import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    isLoginFailed: boolean = false;

    form: FormGroup = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
    });

    constructor(
        private authService: AuthService,
        private toastr: ToastrService,
        private router: Router,
        private translate: TranslateService
    ) { }

    ngOnInit(): void {
        this.authService.redirectToDefault();
    }

    submit() {
        if (this.form.valid) {
            const { username, password } = this.form.value;

            this.authService.login(username, password).subscribe({
                next: () => {
                    this.toastr.success(this.translate.instant('login.success')); 
                    this.authService.redirectToDefault();
                },
                error: (error) => {
                    this.toastr.error(error);
                }
            });
        }
    }
}
