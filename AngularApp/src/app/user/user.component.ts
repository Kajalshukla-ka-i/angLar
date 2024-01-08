import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { Users } from './users.modal';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  user_value:any;
  api_value:any;
  target:string ='';
  userobj = new Users()
  constructor(private userdata:UserDataService){}

  ngOnInit():void{
   this.user_value= this.userdata.getUserData();
  //  console.log(this.user_value);

   this.showAPIDATA();
  }

  showAPIDATA(){
    this.userdata.getDataFromAPI().subscribe(res=>{
      console.log(res);
      this.api_value=res;
    })
  }

  add_Student(){
    // console.log(this.userobj);
    this.userdata.AddDataFromAPI(this.userobj).subscribe((response: any)=>{
      this.showAPIDATA();//refresh data
      this.userobj.name ='';
      this.userobj.class='';
      this.userobj.email='';
      console.log(response);
      if(response.code ==1){
        this.target = '<div class="alert alert-success"> '+response.message+'</div>'
      }else if(response.code==2){
        this.target = '<div class="alert alert-warning"> '+response.message+'</div>'
      }
    });
  }

  delete_data(id:any){
    this.userdata.DeleteDataFromAPI(id).subscribe((response:any) =>{
      console.log('delete successful');
      this.showAPIDATA();
      console.log(response);
      if(response.code ==1){
        this.target = '<div class="alert alert-success"> '+response.message+'</div>'
      }else if(response.code==2){
        this.target = '<div class="alert alert-warning">'+response.message+'</div>'
      }
    });
  }

}
