import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { ITask } from 'src/app/models/task.interface';

import { TaskService } from '../../../services/task-service.service';

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class TaskListComponent implements OnInit {
  constructor(private taskService: TaskService, private _fb: FormBuilder) {
    this.initializeForm();
  }

  filterForm: FormGroup;
  list: ITask[];
  filteredTaskList: Observable<ITask[]>;

  dummyTask = {
    message:
      "Testing initializeForm, initializeForm initializeForm initializeForm initializeForm initializeForm initializeForm initializeForm",
  };

  ngOnInit(): void {
    this.filteredTaskList = this.taskService.getTaskList().pipe(
      map((data) => {
        if (data.length) return data;
        return [
          this.dummyTask,
          this.dummyTask,
          this.dummyTask,
          this.dummyTask,
          this.dummyTask,
          this.dummyTask,
          this.dummyTask,
          this.dummyTask,
          this.dummyTask,
        ];
      }),
      tap((list) => (this.list = [...list]))
    );
  }

  private initializeForm() {
    this.filterForm = this._fb.group({
      priority: [""],
      date: [],
      message: [],
    });
    this.filterForm.valueChanges
      .pipe(
        debounceTime(200),
        map((newValue) =>
          this.list.filter((task) => this.taskMatched(task, newValue))
        )
      )
      .subscribe((newList) => (this.filteredTaskList = of(newList)));
  }

  private taskMatched(task: ITask, matchingCriteria: Partial<ITask>) {
    if (!matchingCriteria) return true;
    if (!task) return false;
    if (matchingCriteria.message) {
      if (!task.message.match(new RegExp(matchingCriteria.message, "gi")))
        return false;
    }
    if (matchingCriteria.priority) {
      if (+matchingCriteria.priority !== +task.priority) return false;
    }
    return true;
  }

  sortListBy(key: string) {}

  searchUsersBy(value) {}
}
