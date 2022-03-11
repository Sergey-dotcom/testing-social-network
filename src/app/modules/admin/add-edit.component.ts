import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { UsersService } from 'src/app/services/users.service';
import { birthdayValidator } from 'src/app/validators/birthday.validator';
import { educationPeriodValidator } from 'src/app/validators/education-period.validation';

@Component({
    templateUrl: 'add-edit.component.html',
    styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
    form: FormGroup = this.formBuilder.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        login: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(4)]],
        role: [''],
        status: ['offline'],
        birthday: new FormControl(new Date(), [
            Validators.required,
            birthdayValidator()
        ]),
        city: [''],
        country: [''],
        about: [''],
        educations: this.formBuilder.array([]),
    });
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    hidePassword = true;

    avatarError: string | null;
    isAvatarSaved: boolean;
    avatarBase64: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private usersService: UsersService,
        private toastr: ToastrService,
        private translate: TranslateService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;


        if (!this.isAddMode) {
            this.usersService
                .getById(this.id)
                .pipe(first())
                .subscribe((data) => {
                    const educations = data.educations;
                    delete data.educations;

                    this.form.patchValue(data);
                    if (data.avatar) {
                        this.isAvatarSaved = true;
                        this.avatarBase64 = data.avatar;
                    }
                    if(educations) {
                        educations.forEach((item) => {
                            const row = this.getEducation();
                            row.patchValue(item);
                            this.educations.push(row);
                        });
                    }
                });
        }
    }

    get f() {
        return this.form.controls;
    }

    get educations(): FormArray {
        return this.form.get('educations') as FormArray;
    }

    getEducation(): FormGroup {
        return this.formBuilder.group({
            type: ['', Validators.required],
            title: ['', Validators.required],
            specialization: [''],
            start: [''],
            end: ['']
        }, { validator: educationPeriodValidator });
    }

    addEducation() {
        this.educations.push(this.getEducation());
    }

    removeEducation(index: number) {
        this.educations.removeAt(index);
    }

    onSubmit() {
        this.submitted = true;

        this.toastr.clear();

        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createUser();
        } else {
            this.updateUser();
        }
    }

    private createUser() {
        const data = this.form.value;
        data.avatar = this.avatarBase64;

        this.usersService
            .create(data)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.toastr.success(this.translate.instant('add_edit.success'));
                    this.router.navigate(['/admin']);
                },
                error: (error) => {
                    this.toastr.error(error);
                    this.loading = false;
                },
            });
    }

    private updateUser() {
        const data = this.form.value;
        data.avatar = this.avatarBase64;

        this.usersService
            .update(this.id, data)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.toastr.success(this.translate.instant('add_edit.update'));
                    this.router.navigate(['/admin']);
                },
                error: (error) => {
                    this.toastr.error(error);
                    this.loading = false;
                },
            });
    }

    avatarChangeEvent(fileInput: any) {
        this.avatarError = null;
        if (fileInput.target.files && fileInput.target.files[0]) {
            const max_size = 20971520;
            const allowed_types = ['image/png', 'image/jpeg'];

            if (fileInput.target.files[0].size > max_size) {
                this.avatarError = `${this.translate.instant('add_edit.size')} ${max_size / 1024
                    }Mb`;

                return false;
            }

            if (!allowed_types.includes(fileInput.target.files[0].type)) {
                this.avatarError = this.translate.instant('add_edit.img');
                return false;
            }
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const image = new Image();
                image.src = e.target.result;
                image.onload = () => {
                    this.avatarBase64 = e.target.result;
                    this.isAvatarSaved = true;
                    return true;
                };
            };

            reader.readAsDataURL(fileInput.target.files[0]);
        }

        return true;
    }

    removeAvatar() {
        this.avatarBase64 = '';
        this.isAvatarSaved = false;
    }
}
