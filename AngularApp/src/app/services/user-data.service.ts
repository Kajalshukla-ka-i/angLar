import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  userData:any;
  
  private API_URL = (environment as any).API_URL;

  constructor(private httpRequest:HttpClient) { }
  getUserData(){
   return this.userData =[
      {
        'name':'abc',
        'email' : 'abc@gmail.com'
      },
      {
        'name' : 'qwer',
        'email': 'qwer@gmail.com'
      }
    ];
  }

  getDataFromAPI(){
    return this.httpRequest.get(this.API_URL +'users_vew');
  }
  AddDataFromAPI(data:any){
    return this.httpRequest.post(this.API_URL +'add_users',data);
  }
}
