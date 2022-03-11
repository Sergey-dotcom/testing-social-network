import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { first } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialog } from './delete-confirmation.dialog';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'login', 'role', 'status', 'name', 'birthday' ,'actions'];
    users?: User[];

    constructor(
        private authService: AuthService,
        private usersService: UsersService,
        private toastr: ToastrService,
        public dialog: MatDialog,
        private translate: TranslateService
    ) { }

    ngOnInit(): void {
        this.retrieveUsers();
    }

    retrieveUsers(): void {
        this.usersService.getAll()
            .pipe(first())
            .subscribe({
                next: (data) => {
                    this.users = data;
                },
                error: (error) => {
                    this.toastr.error(error);
                }
            });
    }

    openDeleteDialog(id: string) {
        const currentUser = this.authService.userValue;

        if(currentUser.id === id) {
            this.toastr.error(this.translate.instant('add_edit.error'));
            return;
        }

        const dialogRef = this.dialog.open(DeleteConfirmationDialog);

        dialogRef.afterClosed().subscribe((result: boolean) => {
            if(result) {
                this.deleteUser(id);
            }
        });
    }

    deleteUser(id: string) {
        const user = this.users?.find(x => x.id === id);

        this.usersService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users?.filter(x => x.id !== id));
    }
}
