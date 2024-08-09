import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isloading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  userData: BehaviorSubject<any> = new BehaviorSubject(null);

  baseURL = 'https://ecommerce.routemisr.com';
  constructor(private _http: HttpClient, private _router: Router) {
    this.getUserData()
  }

  singup(data: any): Observable<any> {
    return this._http.post(`${this.baseURL}/api/v1/auth/signup`, data);
  }
  login(data: any): Observable<any> {
    return this._http.post(`${this.baseURL}/api/v1/auth/signin`, data);
  }

  logOut() {
    localStorage.removeItem('token');
    this.userData.next(null);
    this._router.navigate(['/login'])
  }

  getUserData() {
    if (!localStorage.getItem('token')) return;
    var token = localStorage.getItem('token');
    var decoded = jwt_decode(token!);
    this.userData.next(decoded);

    // console.log(decoded);
  }


}
