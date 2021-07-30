import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html'
})
export class NotfoundComponent implements AfterViewInit {
  constructor(private oRouter : Router){}
  ngAfterViewInit() {}
  NotfoundComponent_RedirectToLoginPage()
  {
    localStorage.clear();
    this.oRouter.navigate(["/login"]);
  }
}
