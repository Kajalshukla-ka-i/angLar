// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // Check if localStorage is available
    if (typeof localStorage !== 'undefined') {
      // Retrieve data from localStorage
      const isLoggedIn = localStorage.getItem('token');
      // const userRole = localStorage.getItem('userRole');

      // Your authorization logic here
      if (isLoggedIn) {
        // console.log('true');
        // this.router.navigate(['/users']);
        return true;
      }
    }

    // Redirect to the login page if not authorized
    return this.router.createUrlTree(['/login']);
  }
}


// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
// import { UserDataService } from './services/user-data.service';
// import { Observable } from 'rxjs';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // // export const authGuard: CanActivateFn = (route, state) => {
// // //   return true;

// // // };
// // // export class AuthGuard implements CanActivate 
// // export class AuthGuard implements CanActivate {
// //   constructor(private router: Router, state: RouterStateSnapshot) { };
// //   token:any;
// //   canActivate(
// //     next: ActivatedRouteSnapshot,
// //     state: RouterStateSnapshot): boolean {
// //     let isLoggedIn = this.token.localStorage.getItem('token');
// //     if (isLoggedIn) {
// //       return true
// //     } else {
// //       this.router.navigate(['/login']);
// //       return false;
// //     }
// //   }

// // };
// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   token: any;
//   constructor(private authService: UserDataService, private router: Router) { }
//   // token: any;
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

//     if (typeof localStorage !== 'undefined' && localStorage.getItem('token')) {
//       //  token = localStorage.getItem('token');

//       const isLoggedIn = this.token.localStorage.getItem('token');
//       console.log(isLoggedIn);
//       if (isLoggedIn) {
//         this.router.navigate(['/users']);

//         return true
//       } else {
//         this.router.navigate(['/login']);
//         return false;
//       }
//     }else {
//       // Handle the case where localStorage is not available (e.g., server-side rendering)
//       console.error('localStorage is not available.');
//       return false;
//     }
//   }
// }
