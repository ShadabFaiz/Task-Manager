import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { IUser } from 'src/app/models/user.interface';
import { UserService } from 'src/app/pages/tasks/services/user.service';

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  users: IUser[];
  filteredUsers: Observable<IUser[]>;

  // Form used for searching user by their name.
  filterForm: FormGroup;

  constructor(
    private _userService: UserService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.filteredUsers = this._userService
      .getUserList()
      .pipe(tap((users) => (this.users = users)));
  }

  initializeForm() {
    this.filterForm = this._formBuilder.group({
      name: [],
    });
    this.filterForm.controls.name.valueChanges
      .pipe(
        debounceTime(200),
        map((newValue) => {
          newValue = newValue ? newValue.trim() : "";
          return this.users.filter((user) =>
            user.name.match(new RegExp(newValue, "gi"))
          );
        })
      )
      .subscribe((userList) => {
        this.filteredUsers = of(userList);
      });
  }
}
