import { Component, OnInit, Inject } from '@angular/core';
import { TOASTR_TOKEN, Toastr } from 'src/app/common/toastr.service';
import { Bol } from 'src/app/models/bol';
import { BolService } from 'src/app/Services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ez-saved-bol-list',
  templateUrl: './saved-bol-list.component.html',
  styleUrls: ['./saved-bol-list.component.css']
})
export class SavedBolListComponent implements OnInit {
  // bols: Promise<IBol[]>;

  @Inject(TOASTR_TOKEN)
  private toastr: Toastr;

  bols: Bol[]=[];
  selectedBol: Bol;
  errorMsg;
  constructor(
    private bolService: BolService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.getSubmittedBols();
  }

  getSubmittedBols() {
    this.bolService.getUserIsSubmittedBols(false).subscribe(
      data => {
        this.spinner.hide();
        this.bols = data;
        //console.log(data);
      },
      (err: any) => {
        this.spinner.hide();
        this.errorMsg = err;
      }
    );

  }
}
