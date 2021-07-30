import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {HttpHeaders} from "@angular/common/http";

let accessToken = localStorage.getItem("accessToken");
let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-app-name': 'fm',
    'x-org-name': 'cloud'
  })
}

@Injectable({
  providedIn: 'root'
})

export class UploadImageService
{

  constructor(private http: HttpClient){}

  UploadImageService_RetrieveSignedUrl(body: any): Observable<any>
  {
    return this.http.post(environment.apiUrl + '/foldersvc/cloudstorage/folder/retieveSignedUrl', body, httpOptions);
  }

  UploadImageService_UploadFileOnSignedUrl(body: any, signedUrl): Observable<any>
  {
    return this.http.put(signedUrl, body);
  }

  UploadImageService_SaveFileObject(body: any): Observable<any>
  {
    return this.http.post(environment.apiUrl + '/foldersvc/cloudstorage/folder/saveFileObject', body, httpOptions);
  }
}
