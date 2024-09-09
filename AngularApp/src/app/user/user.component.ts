import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { Users } from './users.modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user_value: any;
  api_value: any;
  target: string = '';
  userobj = new Users()
  page: number = 1;
  limit:number = 5; // to show total number of value by default
  skip:number = 0;
  studentResult:any;
  collectionSize:number = 0;


  // sorting
  classnamesort:string='fa fa-sort';
  sortValue:any='';
  prevValue:any='';
  sortOder:string = '';
  constructor(private userdata: UserDataService, private spinner: NgxSpinnerService, private route: Router) { }

  ngOnInit(): void {
    // this.user_value = this.userdata.getUserData();
    //  console.log(this.user_value);

    this.showAPIDATA();
  }

  showAPIDATA() {

    console.log("page value : ", this.page);
    if (this.page == 1) {
      this.skip = 0;
    } else {
      this.skip = (this.page - 1) * this.limit;
    }

    var reqObject = {
      'limit': this.limit,
      'skip': this.skip,
      'search ': this.userobj.search,
      'sort_value':this.sortValue,
      'sort_order' : this.sortOder
    }
    this.userdata.getDataFromAPI(reqObject).subscribe(res => {
      console.log(res);
      this.studentResult = res;
      this.api_value =this.studentResult.data;
      this.collectionSize = this.studentResult.count;

    })

    this.userdata.getFromAPI().subscribe(res => {
      console.log(res);
      this.api_value = res;
      // this.studentResult = res;
      this.api_value =this.studentResult.data;
      this.collectionSize = this.studentResult.count;
    })
  }

  add_Student() {
    // console.log(this.userobj);
    this.spinner.show();
    if (this.userobj.name == undefined || this.userobj.class == undefined || this.userobj.email == undefined || this.userobj.contact == undefined) {
      this.target = '<div class="alert alert-danger"> Please Enter the detail !!</div>'
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
      return;
    }
    this.userdata.AddDataFromAPI(this.userobj).subscribe((response: any) => {
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
      this.showAPIDATA();//refresh data
      this.userobj.name = '';
      this.userobj.class = '';
      this.userobj.email = '';
      this.userobj.contact = '';
      console.log(response);
      if (response.code == 1) {
        this.target = '<div class="alert alert-success"> ' + response.message + '</div>'
      } else if (response.code == 2) {
        this.target = '<div class="alert alert-warning"> ' + response.message + '</div>'
      }
    });
  }

  delete_data(id: any) {

    var c = confirm('Are you sure you want to delete this record ?');
    if (c) {
      this.spinner.show();
      this.userdata.DeleteDataFromAPI(id).subscribe((response: any) => {
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
        console.log('delete successful');
        this.showAPIDATA();
        console.log(response);
        // if (response.code == 2) {
        //   this.target = '<div class="alert alert-success"> ' + response.message + '</div>'
        // } else if (response.code == 1) {
        //   this.target = '<div class="alert alert-warning">' + response.message + '</div>'
        // }
      });
    }

  }

  logoutUser() {

    var c = confirm('Are you sure you want to Logout  ?');
    if (c) {
      this.spinner.show();
      this.userdata.LogoutDataFromAPI(localStorage.getItem('token')).subscribe((response: any) => {
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
        console.log('delete successful');
        // this.showAPIDATA();
        console.log(response);
        if (response.code == 1) {
          localStorage.removeItem('token');
          this.route.navigate(['/login']);
        } else if (response.code == 2) {
          this.target = '<div class="alert alert-warning">' + response.message + '</div>'
        }
      });
    }

  }

  searchUser() {
    this.showAPIDATA();
  }

  setPageLength(){
    this.limit = this.userobj.pageLength;
    console.log('page Length  ' + this.limit);
    this.showAPIDATA();
  }

  orderByMe(x:any){
    if(this.prevValue == x){

      // descending order
      this.sortOder = 'desc';
      this.sortValue = x,
      this.prevValue = "";

    }else{
      // ascending
      this.sortOder = 'asc';
      this.sortValue = x,
      this.prevValue = "";
    }
    this.showAPIDATA();
  }
}
