
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let isLoggedIn = localStorage.getItem('token'); // Corrected the usage of localStorage
    if (isLoggedIn) {
      this.router.navigate(['/users']);
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// // export const authGuard: CanActivateFn = (route, state) => {
// //   return true;
// // };
// // export class AuthGuard implements CanActivate 
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router, state: RouterStateSnapshot) { };
//   token:any;
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): boolean {
//     let isLoggedIn = this.token.localStorage.getItem('token');
//     if (isLoggedIn) {
//       this.router.navigate(['/users']);

//       return true

//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }

// }
