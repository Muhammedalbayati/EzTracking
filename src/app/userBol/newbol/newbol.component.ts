import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BolService } from 'src/app/Services';
import { Toastr, TOASTR_TOKEN } from 'src/app/common/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'ez-newbol',
  templateUrl: './newbol.component.html',
  styleUrls: ['./newbol.component.css']
})
export class NewbolComponent implements OnInit {
  params = new HttpParams()
  userInfo = JSON.parse(localStorage.getItem("userInfo"))
  errorMsg: any
  bol: any = { title: 'Create new BOL', requesterId: this.userInfo.badge };
item:any
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    // private httpParams:HttpParams,
    // private bolService: BolService,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {

    // this.route.paramMap.subscribe(params => {
    //   if (params.get("bolId") != null) {
    //     this.getBolDetails(params.get("bolId"));
    //     // this.getBolItems(params.get("bolId"));
    //   }
    // });
  }


  pushAddedItem(data) {
    //console.log(data);
    this.item=data
  }





}
