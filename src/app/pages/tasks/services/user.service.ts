import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IUserResponseResponse } from 'src/app/models/user-list-response.interface';

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private _http: HttpClient) {}

  getUserList() {
    return this._http
      .get<IUserResponseResponse>(`https://devza.com/tests/tasks/listusers`, {
        headers: this.createBaseHeader(),
      })
      .pipe(map((res) => res.users));
  }

  private createBaseHeader() {
    let headers = new HttpHeaders();
    headers = headers.append(`AuthToken`, "9XDZmOLPVwpXxBgw380LtatsKtIl16bS");
    return headers;
  }
}
