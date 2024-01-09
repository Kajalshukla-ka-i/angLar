import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { Users } from '../user/users.modal';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  
id:any;
userobj = new Users;
data : any;
target: string = '';
  constructor( private route:ActivatedRoute , private userdata: UserDataService, private spinner:NgxSpinnerService){}

  ngOnInit(): void {

    this.id = this.route.snapshot.params.id;
    this.editDta();
  }

  editDta(){
    this.userdata.GetEditDataFromAPI(this.id).subscribe(res => {
      this.data = res;
      this.userobj = this.data;
      console.log(res);
      // this.api_value = res;
    })

  }

  update_Students(){

  }
  update_Student() {
    // console.log(this.userobj);
    this.spinner.show();
    if (this.userobj.name == undefined || this.userobj.class == undefined || this.userobj.email == undefined) {
      this.target = '<div class="alert alert-danger"> Please Enter the detail !!</div>'
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
      return;
    }
    this.userdata.UpdateDataFromAPI(this.id,this.userobj).subscribe((response: any) => {
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
      // this.showAPIDATA();//refresh data
      this.userobj.name = '';
      this.userobj.class = '';
      this.userobj.email = '';
      console.log(response);
      if (response.code == 1) {
        this.target = '<div class="alert alert-success"> ' + response.message + '</div>'
      } else if (response.code == 2) {
        this.target = '<div class="alert alert-warning"> ' + response.message + '</div>'
      }
    });
  }
}
