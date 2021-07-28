import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RouteInfo } from './vertical-sidebar.metadata';
import { ROUTES } from './vertical-menu-items';
import { ADMINROUTES } from './admin-menu-items';

@Injectable({
    providedIn: 'root'
})
export class VerticalSidebarService {

    public screenWidth: any;
    public collapseSidebar: boolean = false;
    public fullScreen: boolean = false;

    MENUITEMS: RouteInfo[] = ROUTES;
    ADMINITEMS: RouteInfo[] = ADMINROUTES;
    items = new BehaviorSubject<RouteInfo[]>(this.MENUITEMS);
    adminItems = new BehaviorSubject<RouteInfo[]>(this.ADMINITEMS);

    constructor() {
    }
}
