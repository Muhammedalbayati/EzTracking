import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ez-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    // console.log(this.route.snapshot.params['userId'])
    // console.log(this.route.snapshot.params['code'])
  }

}
