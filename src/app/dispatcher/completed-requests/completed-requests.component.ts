import { Component, OnInit, Inject } from '@angular/core';
import { TOASTR_TOKEN, Toastr } from 'src/app/common/toastr.service';
import { BolService } from 'src/app/Services';
import { Bol } from 'src/app/models/bol';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from "moment";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'ez-completed-requests',
  templateUrl: './completed-requests.component.html',
  styleUrls: ['./completed-requests.component.css']
})
export class CompletedRequestsComponent implements OnInit {
  // bols: Promise<IBol[]>;
  // fromDate: any
  // toDate: any
  findForm: FormGroup;
  myDate: any;
  selectedBolId:any

  @Inject(TOASTR_TOKEN)
  private toastr: Toastr;

  bols: Bol[] = [];
  selectedBol: Bol;
  errorMsg;
  constructor(
    // private datePipe: DatePipe,
    private fb: FormBuilder,
    private bolService: BolService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    var date = moment.utc()
    var stillUtc = moment.utc(date).toDate();
    var fromDate = moment(stillUtc).subtract(1, "day").format("YYYY-MM-DDT00:00");
    var toDate = moment(stillUtc).format("YYYY-MM-DDT23:59");

    this.findForm = this.fb.group({
      fromDate: [fromDate, Validators.required],
      toDate: [toDate, Validators.required]
    })

    this.spinner.show();
    this.findDate()
  }

  getBols(data: object) {
    this.bolService.getCompletedBols(data).subscribe(
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

  handleSelectedBol(bol) {
    // //console.log(bol)
    this.selectedBolId=bol.bolId
  }

  findDate() {
    var fromDate = this.findForm.get('fromDate').value;
    var toDate = this.findForm.get('toDate').value
    var obj = { fromDate: fromDate, toDate: toDate }
    this.getBols(obj);
  }

}