import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SessionService {
    searchItem: any;

    constructor() {
    }
    session_SetSearchItemAutoCopleted(searchItem) {
        this.searchItem= searchItem;
        localStorage.setItem('searchItem', JSON.stringify(searchItem));
    }

    session_GetSearchItemAutoCopleted() {
        return JSON.parse(localStorage.getItem('searchItem'));
    }
}