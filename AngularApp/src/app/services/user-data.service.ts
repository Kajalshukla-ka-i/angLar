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
  private API_URL = 'http://127.0.0.1:8000/api/';//(environment as any).API_URL;

  constructor(private httpRequest: HttpClient) { }
  currentToken = this.tokenval !== null ? this.tokenval : new Users();

  header = new HttpHeaders({
     'Authorization ': "Bearer " + this.currentToken,
     'token' : this.currentToken,
  })
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

  getDataFromAPI() {
    return this.httpRequest.get(this.API_URL + 'users_vew',{headers :this.header});
  }
  AddDataFromAPI(data: any) {
    return this.httpRequest.post(this.API_URL + 'add_users', data);
  }

  DeleteDataFromAPI(id: any) {
    return this.httpRequest.delete(this.API_URL + 'delete_users/' + id);
  }

  GetEditDataFromAPI(id: any) {
    return this.httpRequest.get(this.API_URL + 'edit_users/' + id);
  }

  UpdateDataFromAPI(id: any, data: any) {
    return this.httpRequest.patch(this.API_URL + 'update_users/' + id, data);
  }

  RegisterDataFromAPI(data: any) {
    return this.httpRequest.post(this.API_URL + 'api/register', data);
  }

  LoginDataFromAPI(data: any) {
    return this.httpRequest.post(this.API_URL + 'api/login', data);
  }
}
