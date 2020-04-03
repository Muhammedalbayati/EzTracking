import { Component, OnInit, Inject, Input } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { UsersListVm } from "src/app/models/usersInfoVm";
import { TOASTR_TOKEN, Toastr } from "../../common";
import { AdminService, LocationsService } from "src/app/Services";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "ez-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"]
})
export class UserDetailComponent implements OnInit {

  user: any
  buildings: any[] = []
  userDetailForm: FormGroup;
  errorMsg;
  roles: any[] = []
  // userId: string;
  idx: any;

 


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private locationService: LocationsService,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getBuildings();
    this.getRoles();
    //this.selectedUser = this.adminService.selectedUser// I use this way because the userId not working with the url parameter

    // //console.log(this.selectedUser)

    this.userDetailForm = this.fb.group({
      userId: null,
      badge: null,//[{ value: this.selectedUser.badge }],//[{ value: null, disabled: true }, [Validators.required]],
      building: null,//this.selectedUser.building,
      email: null, //this.selectedUser.email,
      roleName: null,//[{ value: this.selectedUser.roles }],
      userClaims: null,//this.selectedUser.userClaims,
      firstName: null,// this.selectedUser.userName,
      lastName: null,// this.selectedUser.userName,
      shift: null,//this.selectedUser.shift,
    })

    this.route.paramMap.subscribe(params => {
      if (params.get("userId") != null) {
        var id = params.get("userId");
        //console.log("userId : " + id);
        this.userDetails(id);
        //console.log(this.user)
        // this.getBolItems(params.get("bolId"));
      }
    });

    // if (this.user != null) {
    //   this.fillTheForm()
    // }

  }

  fillTheForm() {
    //console.log(this.user)
    this.userDetailForm.patchValue({
      userId: this.user.userId,
      badge: this.user.badge,//[{ value: null, disabled: true }, [Validators.required]],
      building: this.user.building,
      email: this.user.email,
      roleName: this.user.roleName,//{roleId:this.user.roleId, name:this.user.roleName},
      // roleId: this.user.roleId, //{roleId:this.user.roleId, name:this.user.roleName},
      userClaims: this.user.userClaims,
      lastName: this.user.lastName,
      firstName: this.user.firstName,
      shift: this.user.shift,
    })
  }

  getRoles() {
    this.spinner.show()
    this.adminService.getAllRoles().subscribe(
      data => {
        this.spinner.hide();
        //console.log(data);
        this.roles = data
      },
      (err: any) => {
        this.spinner.hide();
        this.errorMsg = err;
      }
    );
  }

  getBuildings() {
    this.spinner.show()
    this.locationService
      .getBuildings()
      .subscribe(
        data => {
          this.buildings = data;
          //console.log(data)
          this.spinner.hide()
        },
        (err: any) => (this.errorMsg = err)
      );
  }
  // showDeleteUserModal(userId) {
  //   //console.log(this.adminService.selectedUser);
  //   // this.userDetailsForm.controls.userId.setValue(userId);
  //   // this.idx = idx;
  // }


  userDetails(userId) {
    this.adminService.getUserDetail(userId).subscribe(
      b => {
        this.spinner.hide();
        this.user = b[0]
        //console.log(this.user)
        this.fillTheForm()
        //this.toastr.success("User info been updated successfuly!");
      },
      (err: any) => {
        this.spinner.hide();
        this.errorMsg = err;
      }
    );
  }

  AssignUserToRole() {
    var role = this.userDetailForm.controls.roleName.value;
    var userId = this.userDetailForm.controls.userId.value;

    this.adminService.AssignUserToRole(userId, role).subscribe(
      b => {
        this.spinner.hide();
        // this.users.splice(this.idx, 1);
        this.toastr.success("User role been updated successfuly!");
      },
      (err: any) => {
        this.spinner.hide();
        this.errorMsg = err;
      }
    );
  }


  save() {

    var _user = {
      userId: this.user.userId,
      badge: this.userDetailForm.get('badge').value,//[{ value: null, disabled: true }, [Validators.required]],
      building: this.userDetailForm.get('building').value,
      email: this.userDetailForm.get('email').value,
      roleName: this.userDetailForm.get('roleName').value,// roleName:this.user.roleName},
      // roleId: this.user.roleId,
      // userClaims: this.user.userClaims,
      lastName: this.userDetailForm.get('lastName').value,
      firstName: this.userDetailForm.get('firstName').value,
      shift: this.userDetailForm.get('shift').value,
    }
    //console.log('form values ', _user)
    this.adminService.updateUser(_user).subscribe(
      b => {
        this.spinner.hide();
        // this.users.splice(this.idx, 1);
        this.toastr.success("User info been updated successfuly!");
      },
      (err: any) => {
        this.spinner.hide();
        this.errorMsg = err;
      }
    );
  }


  deleteUser() {
    this.spinner.show();
    this.adminService.deleteUser(this.user.userId).subscribe(
      b => {
        this.spinner.hide();
        // this.users.splice(this.idx, 1);
        this.toastr.success("User is deleted successfuly!");
      },
      (err: any) => {
        this.spinner.hide();
        this.errorMsg = err;
      }
    );
  }



}
