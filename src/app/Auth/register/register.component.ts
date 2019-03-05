import { Component, OnInit, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from "@angular/forms";
import { AuthenticationService, LocationsService } from "src/app/Services";
import { User } from "src/app/models/user";
import { TOASTR_TOKEN, Toastr } from "../../common/toastr.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";

@Component({
  selector: "ez-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMsg: string = "";
  msg: string
  user: User;
  buildings: any[] = []
  // userName: FormControl = new FormControl();
  // email: FormControl = new FormControl();
  // password: FormControl = new FormControl();
  // confirmPassword: FormControl = new FormControl();
  // building: FormControl = new FormControl();
  // shift: FormControl = new FormControl();
  // badge: FormControl = new FormControl();

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private locationService: LocationsService,
    private route: Router,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getBuildings();
    this.registerForm = this.fb.group({
      // userName: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      /*
      At least 8 characters in length
      Lowercase letters
      Uppercase letters
      Numbers
      Special characters
      */
      password: [null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')]],
      confirmPassword: [null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')]],
      building: [null, [Validators.required]],
      shift: [null, [Validators.required]],
      badge: [null, [Validators.required]],

    });
  }

  resetForm() {
    if (this.registerForm != null) this.registerForm.reset();
    this.registerForm.patchValue({
      // UserName: null,
      firstName: null,
      lastName: null,
      password: null,
      confirmPassword: null,
      email: null,
      shift: null,
      badge: null,
      building: null
    });
  }

  register() {
    this.errorMsg = "";
    this.msg = ""
    this.user = {
      userName: null,
      firstName: this.registerForm.get('firstName').value,
      lastName: this.registerForm.get('lastName').value,
      password: this.registerForm.get('password').value,
      confirmPassword: this.registerForm.get('confirmPassword').value,
      email: this.registerForm.get('email').value,
      shift: this.registerForm.get('shift').value,
      badge: this.registerForm.get('badge').value,
      building: this.registerForm.get('building').value
    };

    this.spinner.show();
    this.authService.registerUser(this.registerForm.value).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.registerForm.reset();
        this.msg = "User registration succeeded, please check your email."
        //this.route.navigate(["/login"])
        this.toastr.success("User registration succeeded, please check your email.");

      },
      (err: any) => {
        this.spinner.hide();
        this.toastr.error(err);
        this.errorMsg = err;

      }
    );
    this.spinner.hide();
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

  isInputValid(ctrl) {
    // const isValid = this.loginForm.controls.email.valid == true
    // const isInvalid = this.loginForm.controls.email.invalid == true
    const isValid = ctrl.valid == true
    const isInvalid = ctrl.invalid == true
    return { 'is-valid': isValid, 'is-invalid': isInvalid }
  }



}

// (data: any) => {
//   if (data.Succeeded == true) {
//     this.registerForm.reset();
//     this.toastr.success("User registration succeeded");
//   } else {
//     this.toastr.error(data.Errors[0]);
//   }
// }
