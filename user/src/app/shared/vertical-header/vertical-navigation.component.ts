import { Component, AfterViewInit, EventEmitter, Output, ViewChild } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbPanelChangeEvent,
  NgbCarouselConfig
} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/DataService';
import { Observable } from 'rxjs/Observable';
import { FileName } from 'src/app/models/FileName.interface';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
declare var $: any;

@Component({
  selector: 'app-vertical-navigation',
  templateUrl: './vertical-navigation.component.html'
})
export class VerticalNavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = true;

  // This is for Notifications
  notifications: Object[] = [
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Luanch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM'
    },
    {
      btn: 'btn-success',
      icon: 'ti-calendar',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
      time: '9:10 AM'
    },
    {
      btn: 'btn-info',
      icon: 'ti-settings',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      time: '9:08 AM'
    },
    {
      btn: 'btn-primary',
      icon: 'ti-user',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject: 'I am a singer!',
      time: '9:08 AM'
    },
    {
      useravatar: 'assets/images/users/4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  public selectedLanguage: any = {
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us'
  }

  public languages: any[] = [{
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us'
  },
  {
    language: 'Español',
    code: 'es',
    icon: 'es'
  },
  {
    language: 'Français',
    code: 'fr',
    icon: 'fr'
  },
  {
    language: 'German',
    code: 'de',
    icon: 'de'
  }]
  user: string;



  constructor(private modalService: NgbModal, public router: Router, private translate: TranslateService, private dataService: DataService,) {
    this.user = localStorage.getItem("username");
    translate.setDefaultLang('en');
  }
  Navigation_PageReload() {
    window.location.reload();
  }
  options$: Observable<FileName[]>;
  keyword = 'patientName';
  changeLanguage(lang: any) {
    this.translate.use(lang.code)
    this.selectedLanguage = lang;
  }
  ngAfterViewInit() { }
  getServerResponse(terms) {
    console.log("input ", terms);
    if (terms !== '') {
      this.dataService.DataService_StandardSearch(terms).subscribe(
        (result: any) => {
          ;
          console.log("result ", result)
          this.options$ = result;
        }
      );
    }
  }
  selectEvent(selectedItem) {
    console.log("selectEvent ", selectedItem);
  }
  catchAdvanceSearchEvent(message: string) {
    console.log("message ====>" + message);
    this.router.navigate(['/app/documents-upload']);
  }

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    this.router.navigate(['/authentication/login']);

  }
}
