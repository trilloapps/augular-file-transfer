import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-app-name': 'auth',
      'x-org-name': 'cloud',
    })
  }

  constructor(private http: HttpClient) { }
  AuthService_Login(credentials : any): Observable<any> {
    return this.http.post(environment.apiUrl+'/ajaxLogin',
        `${credentials}`
    ,this.httpOptions);
  }
  public getToken() {
    return localStorage.getItem('accessToken');
  }
}
