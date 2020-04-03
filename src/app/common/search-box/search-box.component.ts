import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { BolService } from 'src/app/Services';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { TOASTR_TOKEN, Toastr } from '../toastr.service';

@Component({
  selector: 'ez-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  searchForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private bolService: BolService
  ) {

  }

  ngOnInit() {

    this.searchForm = this.fb.group({
      searchTerm: null
    })

  }


  handleSearch() {

    var s = this.searchForm.value
    this.searchBols(s)
  }

  searchBols(s) {
    this.spinner.show();
    this.bolService.searchBols(s).subscribe(
      data => {
        this.spinner.hide();
        this.bolService.searchResult = data;
        // goSearchResultPage(searchTerm: string) {
        //   //I was not able to refresh the search-result component
        //   // I got this code below form folowing link- 9/16/2018
        //   //https://github.com/angular/angular/issues/13831#issuecomment-418984942
        this.router
          .navigateByUrl("/", { skipLocationChange: true })
          .then(() => this.router.navigate(["/searchresult"]));
      },
      err => {
        //console.log(err);
        this.spinner.hide();
      }
    );
  }


}
