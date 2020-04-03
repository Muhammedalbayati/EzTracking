import { Component, OnInit } from '@angular/core';
import { AdvanceSearchQry } from '../models/advanceSearchQry';
import { BolService } from '../Services';

@Component({
  selector: 'ez-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.css']
})
export class AdvanceSearchComponent implements OnInit {
  advnceSearch=new AdvanceSearchQry
  result: any[] = []

  users: any[] = [];
  filteredUsers: any[] = []
  errorMsg;
  filterBy: string

  constructor(
    private bolService: BolService
  ) { }

  ngOnInit() {

  }



  search(qryClass) {
    // return Object.keys(this).every((key) => user[key] === this[key]);
    for (const prop in qryClass) {
      // //console.log(`qryClass.${prop} = ${qryClass[prop]}`);
      //console.log(qryClass)
    }
    

  }


  searchTermChanged() {
    this.advnceSearch.bolId=2222;
    this.search(this.advnceSearch)
    // this.filteredUsers = this.users.filter(u =>
    //   u.firstName.toLocaleLowerCase().indexOf(this.filterBy) !== -1
    //   || u.lastName.toLocaleLowerCase().indexOf(this.filterBy) !== -1
    //   || u.badge.toLocaleLowerCase().indexOf(this.filterBy) !== -1
    //   || u.email.toLocaleLowerCase().indexOf(this.filterBy) !== -1
    //   || u.building.toLocaleLowerCase().indexOf(this.filterBy) !== -1
    //   || u.roleName.toLocaleLowerCase().indexOf(this.filterBy) !== -1
    //   || u.shift.toLocaleLowerCase().indexOf(this.filterBy) !== -1
    // )
  }


}