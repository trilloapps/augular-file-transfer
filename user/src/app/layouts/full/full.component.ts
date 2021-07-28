import { Component, OnInit, HostListener, EventEmitter, Output , ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ResizedEvent } from 'angular-resize-event';
declare var $: any;

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  public config: PerfectScrollbarConfigInterface = {};
 
  constructor(public router: Router ) { }
  
  tabStatus = 'justified';

  public isCollapsed = true;

  public innerWidth: any;
  public defaultSidebar: any;
  public showSettings = false;
  public showMobileMenu = false;
  public expandLogo = false;
  logoLogin = false
  logoTrillo = false
  status = false;

  options = {
    theme: 'light', // two possible values: light, dark
    dir: 'ltr', // two possible values: ltr, rtl
    layout: 'vertical', // two possible values: vertical, horizontal
    sidebartype: 'full', // four possible values: full, iconbar, overlay, mini-sidebar
    sidebarpos: 'fixed', // two possible values: fixed, absolute
    headerpos: 'fixed', // two possible values: fixed, absolute
    boxed: 'full', // two possible values: full, boxed
    navbarbg: 'skin6', // six possible values: skin(1/2/3/4/5/6)
    sidebarbg: 'skin5', // six possible values: skin(1/2/3/4/5/6)
    logobg: 'skin6' // six possible values: skin(1/2/3/4/5/6)
  };

  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {
    this.logoTrillo = true
    if (this.router.url === '/') {
      this.router.navigate(['/dashboard/classic']);
    }
    this.defaultSidebar = this.options.sidebartype;
    this.handleSidebar();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: string) {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    switch (this.defaultSidebar) {
      case 'full':
      case 'iconbar':
        if (this.innerWidth < 1024) {
          this.options.sidebartype = 'mini-sidebar';
          this.logoTrillo=true;
          this.logoLogin=false;
        } else {
          this.options.sidebartype = this.defaultSidebar;
          this.logoTrillo=true;
          this.logoLogin=false;
        }
        break;

      case 'overlay':
        if (this.innerWidth < 767) {
          this.options.sidebartype = 'mini-sidebar';
          //console.log("logologin")
          //this.logoLogin=true;
          //this.logoTrillo=false;
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;

      default:
    }
  }

  toggleSidebarType() {
    
    switch (this.options.sidebartype) {
      case 'full':
      //case 'iconbar':
        this.options.sidebartype = 'mini-sidebar';
       this.logoTrillo = !this.logoTrillo;
       this.logoLogin = !this.logoLogin

        break;

      case 'overlay':
        this.showMobileMenu = !this.showMobileMenu;
        break;

      case 'mini-sidebar':
        if (this.defaultSidebar === 'mini-sidebar') {
         
          this.options.sidebartype = 'full';
        } else {
          this.logoLogin = !this.logoLogin
          this.logoTrillo = !this.logoTrillo;
      
          this.options.sidebartype = this.defaultSidebar;
        }
        break;

      default:
    }
  }

  handleClick(event: boolean) {
    this.showMobileMenu = event;
  }
  clickEvent() {
    this.status = !this.status;
  }
}
