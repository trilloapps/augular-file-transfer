import { Component, OnInit , Output ,EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.css']
})

export class HamburgerComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  constructor(private translate: TranslateService) { 
    translate.setDefaultLang('en');
  }
  public showSearch = false;

  ngOnInit(): void {
  }
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
    language: 'French',
    code: 'fr',
    icon: 'fr'
  },
  {
    language: 'Spanish',
    code: 'es',
    icon: 'es'
  },
  {
    language: 'German',
    code: 'de',
    icon: 'de'
  }]
  changeLanguage(lang: any) {
    this.translate.use(lang.code)
    this.selectedLanguage = lang;
  }

}
