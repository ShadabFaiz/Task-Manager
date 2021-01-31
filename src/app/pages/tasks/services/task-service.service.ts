import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITaskListResponse } from 'src/app/models/task-list-response.interface';
import { ITask } from 'src/app/models/task.interface';

@Injectable({
  providedIn: "root",
})
export class TaskService {
  constructor(private _http: HttpClient) {}

  getTaskList() {
    return this._http
      .get<ITaskListResponse>(`https://devza.com/tests/tasks/list`, {
        headers: this.createBaseHeader(),
      })
      .pipe(map((res) => res.tasks));
  }

  createTask(body: ITask) {
    return this._http
      .post<{ status: string }>(`https://devza.com/tests/tasks/create`, body, {
        headers: this.createBaseHeader(),
      })
      .pipe(map((res) => (res.status == "error" ? throwError("sss") : res)));
  }

  private createBaseHeader() {
    let headers = new HttpHeaders();
    headers = headers.append(`AuthToken`, "9XDZmOLPVwpXxBgw380LtatsKtIl16bS");
    return headers;
  }
}
