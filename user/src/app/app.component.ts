import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor( public router: Router,private bnIdle: BnNgIdleService) { // initiate it in your component constructor
    this.bnIdle.startWatching(3600).subscribe((res) => {
      if(res) {
        localStorage.clear();
        this.router.navigate(['/login']);
          console.log("session expired");
      }
    });
  }
}
