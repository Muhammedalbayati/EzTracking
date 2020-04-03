import { Component, OnInit, Inject, Output, EventEmitter } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { UsersListVm } from "src/app/models/usersInfoVm";
import { TOASTR_TOKEN, Toastr } from "../../common";
import { AdminService } from "src/app/Services";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "ez-userslist",
  templateUrl: "./userslist.component.html",
  styleUrls: ["./userslist.component.css"]
})
export class UserslistComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = []
  errorMsg;
  filterBy: string

  // @Output() selectUserEvent = new EventEmitter();

  @Inject(TOASTR_TOKEN)
  private toastr: Toastr;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getUsers();

  }

  getUsers() {
    this.adminService.getAllUsers().subscribe(
      data => {
        this.spinner.show();
        this.users = data;
        this.filteredUsers = this.users
        //console.log(data);
        this.spinner.hide();
      },
      (err: any) => {
        this.spinner.hide();
        this.errorMsg = err;
      }
    );
  }


  searchTermChanged() {

    this.filteredUsers = this.users.filter(u =>
      u.firstName.toLocaleLowerCase().indexOf(this.filterBy) !== -1
      || u.lastName.toLocaleLowerCase().indexOf(this.filterBy) !== -1
      || u.badge.toLocaleLowerCase().indexOf(this.filterBy) !== -1
      || u.email.toLocaleLowerCase().indexOf(this.filterBy) !== -1
      || u.building.toLocaleLowerCase().indexOf(this.filterBy) !== -1
      || u.roleName.toLocaleLowerCase().indexOf(this.filterBy) !== -1
      || u.shift.toLocaleLowerCase().indexOf(this.filterBy) !== -1
      // {
      //   for (const prop in u) {
      //     // //console.log(`u.${prop} = ${u[prop]}`);
      //     prop.toLocaleLowerCase().indexOf(this.filterBy) !== -1;
      //     // //console.log(u[prop])
      //   }
      // }
    )
  }




}
