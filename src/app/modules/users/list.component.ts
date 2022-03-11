import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, switchMap, first } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'login', 'actions'];
  users?: User[];
  usersSearch = new FormControl('', Validators.pattern('[a-zA-Z0-9]'));
  foundUsers: User[] = [];
  filteredOptions: Observable<any>;

  constructor(
    private usersService: UsersService,
    private toastr: ToastrService
  ) {
    this.filteredOptions = this.usersSearch.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(value => this.filter(value || ''))
    )
  }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.usersService
      .getAll()
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (error) => {
          this.toastr.error(error);
        },
      });
  }

  getFullName(user: User) {
    return `${user.first_name} ${user.last_name}`;
  }

  filter(value: string) {
    return !value ? [] : this.usersService.findByName(value).pipe();
  }
}
