import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services';

@Component({
  selector: 'ez-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public authServices: AuthenticationService,) { }

  ngOnInit() {
  }

  logout() {
    this.authServices.logOut();
    // this.router.navigate(["/home"]);
  }
  
}
