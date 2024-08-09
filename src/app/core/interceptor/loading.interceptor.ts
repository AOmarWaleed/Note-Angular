import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable , BehaviorSubject , finalize } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  
  constructor(private _authSe:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._authSe.isloading.next(true)
    return next.handle(request).pipe(
      finalize(()=> this._authSe.isloading.next(false))
    );
  }
}
