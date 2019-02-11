import { Component, OnInit, Inject } from '@angular/core';
import { AuthenticationService } from 'src/app/Services';
import { Router } from '@angular/router';
import { Toastr, TOASTR_TOKEN } from '../toastr.service';

@Component({
  selector: 'ez-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(
    public authServices: AuthenticationService,
    private router: Router,
    @Inject(TOASTR_TOKEN) private toaster: Toastr
  ) { }

  ngOnInit() {
  }

}
