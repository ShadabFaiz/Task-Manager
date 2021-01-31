import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ITask } from 'src/app/models/task.interface';
import { IUser } from 'src/app/models/user.interface';

import { TaskService } from '../../../services/task-service.service';
import { UserService } from '../../../services/user.service';

// import * as $ from 'jquery';

declare var $: any;

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class TaskCreateComponent implements OnInit {
  taskForm: FormGroup;
  isApiInProgress = false;

  users: Observable<IUser[]>;

  responseMessage = {
    failedMessage: null,
    successMessage: null,
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _taskService: TaskService,
    private _userService: UserService
  ) {
    this.initializeForm();
  }

  public fetchUserList() {
    this.users = this._userService.getUserList();
  }

  ngOnInit(): void {
    this.fetchUserList();
    setTimeout(() => {
      $(document).ready(function () {
        ($(".datepicker") as any).datepicker({
          format: "dd/mm/yyyy",
        });
      });
    }, 3000);
  }

  initializeForm() {
    this.taskForm = this._formBuilder.group({
      message: [null, [Validators.required]],
      due_date: [],
      priority: [],
      assigned_to: [],
    });
  }

  private resetResponseMessage() {
    this.responseMessage.failedMessage = null;
    this.responseMessage.successMessage = null;
  }

  createTask(value: ITask) {
    this.isApiInProgress = true;

    this.taskForm.disable();
    this.resetResponseMessage();

    this._taskService.createTask(value).subscribe(
      (res) => this.onTaskCreationSuccess(),
      (error) => this.onTaskCreationError()
    );
  }

  private onTaskCreationSuccess() {
    this.responseMessage.successMessage = "Task Created";
    this.isApiInProgress = false;
    this.taskForm.enable();
    this.taskForm.reset();
  }

  private onTaskCreationError() {
    this.responseMessage.failedMessage =
      "Task Creation Failed. Please try after sometime.";
  }
}
