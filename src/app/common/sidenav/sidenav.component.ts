import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services';
import { Router } from '@angular/router';
import { Toastr, TOASTR_TOKEN } from '../toastr.service';

@Component({
  selector: 'ez-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  toggle: boolean = false
  sideBarStyle: any = {}
  mainStyle: any = {}

  constructor(
    public authServices: AuthenticationService,
    private router: Router,
    @Inject(TOASTR_TOKEN) private toaster: Toastr
  ) { }

  ngOnInit() {
    this.doToggle()
  }

  doToggle() {

    // this.toggle = !this.toggle
    if (this.toggle) {
      this.sideBarStyle = { width: '200px' }
      //mainStyle to push the whole content to the right : https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sidenav_push
      this.mainStyle = {
        marginLeft: '2px',
        transition: 'margin-left .5s',
        padding: '1px'
      }
    } else {
      this.sideBarStyle = { width: '50px' }
      this.mainStyle = {
        marginLeft: '50px',
        transition: 'margin-left .5s',
        padding: '1px'
      }
    }
    // //console.log(this.mainStyle)
  }

}
