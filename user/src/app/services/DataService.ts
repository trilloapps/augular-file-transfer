import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

let accessToken =  localStorage.getItem("accessToken");
const httpOptions = {
  headers: new HttpHeaders({

    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-app-name': 'auth',
    'x-org-name': 'cloud',

  })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  body: any;
  private fooSubject = new Subject<any>();
  constructor(private http: HttpClient) { }
  publishSomeData(data: any) {
    this.fooSubject.next(data);
}

getObservable(): Subject<any> {
    return this.fooSubject;
}
DataService_SendFolderName(body): Observable<any>
{
  return this.http.post(environment.apiUrl + '/ds/function/shared/DicomUpload', body, environment.httpOptionsWithAccessToken);
  }
  DataService_StandardSearch(phrase: string): Observable<any>
  {
    let body = {"search": phrase};
    return this.http.post(environment.apiUrl + '/ds/function/shared/StandardSearch', body, environment.httpOptionsWithAccessToken);
  }

}
