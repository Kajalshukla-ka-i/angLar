import { Component } from '@angular/core';
import { Register } from './register.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserDataService } from '../services/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  file: any;

  constructor(private spinner: NgxSpinnerService, private userdata: UserDataService, private route: Router) { }
  registerobj = new Register();
  target: string = '';
  registerData: any
  ngOnInit(): void {
  }

  // register_data(){
  //   console.log(this.registerobj);
  // }

  register_data() {
    // console.log(this.userobj);
    this.spinner.show();
    if (this.registerobj.name == undefined || this.registerobj.email == undefined || this.registerobj.password == undefined || this.registerobj.contact == undefined || this.registerobj.class == undefined) {
      this.target = '<div class="alert alert-danger"> Please Enter the detail !!</div>'
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
      return;
    }
    this.userdata.RegisterDataFromAPI(this.registerobj).subscribe((response: any) => {
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
      // this.showAPIDATA();//refresh data
      this.registerobj.name = '';
      this.registerobj.email = '';
      this.registerobj.password = '';
      this.registerobj.class = '';
      this.registerobj.contact = '';
      console.log(response);
      if (response.code == 1) {
        this.target = '<div class="alert alert-success"> ' + response.message + '</div>'
        this.route.navigate(['/login']);

      } else if (response.code == 2) {
        this.target = '<div class="alert alert-warning"> ' + response.message + '</div>'
      }
    });
  }

  show_password = false;
  showpasswordchars() {
    if (this.show_password == false) {
      this.show_password = true;
    } else {
      this.show_password = false;
    }
  }
  imageUpload(event:any){
    // console.log( event);
    this.file= event.target.files[0];
    console.log(this.file);
  }
}
