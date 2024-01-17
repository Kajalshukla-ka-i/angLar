import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Users } from '../user/users.modal';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  userData: any;
  tokenval: any = localStorage.getItem('token');
  private API_URL = 'http://127.0.0.1:8000/';//(environment as any).API_URL;

  constructor(private httpRequest: HttpClient) { }
  currentToken = this.tokenval !== null ? this.tokenval : new Users();

  // header = new HttpHeaders({
  //    'Authorization ': "Bearer " + this.currentToken,
  //    'token' : this.currentToken,
  // })

  header = new HttpHeaders({
    'Authorization': 'Bearer ' + this.currentToken,
    // other headers...
  });
  getUserData() {
    return this.userData = [
      {
        'name': 'abc',
        'email': 'abc@gmail.com'
      },
      {
        'name': 'qwer',
        'email': 'qwer@gmail.com'
      }
    ];
  }

  getFromAPI() {
    // this.tokenval = localStorage.getItem('token');
    // this.header = new HttpHeaders({
    //   'Authorization': `Bearer ${this.tokenval}`,
    // });

    return this.httpRequest.get(this.API_URL + 'api/users_vew', {
      headers: this.header
    });
  }

  getDataFromAPI(data: any) {
    this.tokenval = localStorage.getItem('token');
    this.header = new HttpHeaders({
      'Authorization': `Bearer ${this.tokenval}`,
    });

    return this.httpRequest.post(this.API_URL + 'api/student', data, {
      headers: this.header
    });
  }
  AddDataFromAPI(data: any) {
    return this.httpRequest.post(this.API_URL + 'add_users', data);
  }

  DeleteDataFromAPI(id: any) {
    return this.httpRequest.delete(this.API_URL + 'api/delete_users/' + id, {
      headers: this.header
    });
  }

  GetEditDataFromAPI(id: any) {
    return this.httpRequest.get(this.API_URL + 'api/edit_users/' + id, {
      headers: this.header
    });
  }

  UpdateDataFromAPI(id: any, data: any) {
    return this.httpRequest.patch(this.API_URL + 'api/update_users/' + id, data, {
      headers: this.header
    });
  }

  RegisterDataFromAPI(data: any) {
    return this.httpRequest.post(this.API_URL + 'api/register', data);
  }

  LoginDataFromAPI(data: any) {
    return this.httpRequest.post(this.API_URL + 'api/login', data);
  }

  LogoutDataFromAPI(token: any) {
    return this.httpRequest.get(this.API_URL + 'api/logout/' + token, {
      headers: this.header
    });
  }
}
