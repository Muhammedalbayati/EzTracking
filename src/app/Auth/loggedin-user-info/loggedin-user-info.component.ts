import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocationsService } from 'src/app/Services';

@Component({
  selector: 'ez-loggedin-user-info',
  templateUrl: './loggedin-user-info.component.html',
  styleUrls: ['./loggedin-user-info.component.css']
})
export class LoggedinUserInfoComponent implements OnInit {
  userInfo
  userRoles
  userInfoForm: FormGroup;
  errorMsg: any
  buildings: any[] = []

  // badge: "EmployeeX123"
  // building: "B30"
  // email: "employee@EzTracking.com"
  // roles: "["Employee"]"
  // userClaims: "[]"
  // userName: "employee@EzTracking.com"
  constructor(
    private fb: FormBuilder,
    private locationService: LocationsService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.userRoles = JSON.parse(this.userInfo.roles)
    // console.log(this.userInfo)
    // console.log(this.userRoles)
    // this.userInfo = JSON.parse(this.userInfo)
    this.getBuildings();

    this.userInfoForm = this.fb.group({
      badge: [{ value: this.userInfo.badge, disabled: true }, []],//[{ value: null, disabled: true }, [Validators.required]],
      building: this.userInfo.building,
      email: this.userInfo.email,
      roles: [{ value: this.userInfo.roles }],
      userClaims: this.userInfo.userClaims,
      lastName: this.userInfo.lastName,
      firstName: this.userInfo.firstName,
      shift: this.userInfo.shift,
    })

    // this.userInfoForm.patchValue({
    //   badge: null,
    //   building: null,
    //   email: null,
    //   roles: null,
    //   userClaims: null,
    //   userName: null,
    //   shift: null,
    // })

  }

  getBuildings() {
    this.spinner.show()
    this.locationService
      .getBuildings()
      .subscribe(
        data => {
          this.buildings = data;
          // console.log(data)
          this.spinner.hide()
        },
        (err: any) => (this.errorMsg = err)
      );
  }




}
