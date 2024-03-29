import { Component } from '@angular/core';
import { Login } from './login.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserDataService } from '../services/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private spinner: NgxSpinnerService, private userdata: UserDataService, private route: Router) { }

  loginobj = new Login;
  target: string = '';
  token: any;

  ngOnInit(): void {
  }

  login_data() {
    this.spinner.show();
    if (this.loginobj.email == undefined || this.loginobj.password == undefined) {
      this.target = '<div class="alert alert-danger"> Please Enter the detail !!</div>'
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
      return;
    }
    this.userdata.LoginDataFromAPI(this.loginobj).subscribe((response: any) => {
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
      // this.showAPIDATA();//refresh data
      // this.loginobj.name = '';
      this.loginobj.email = '';
      this.loginobj.password = '';
      console.log(response);
      if (response.code === 1) {
        this.token = localStorage.setItem('token', response.token);
        this.target = '<div class="alert alert-success"> ' + response.message + '</div>';
        // this.value = localStorage.setItem('token', response.success);
        // console.log(this.token)
        this.route.navigate(['/users']);
      } else if (response.code == 2) {
        this.target = '<div class="alert alert-warning"> ' + response.message + '</div>'
      }
    });
  }
}
