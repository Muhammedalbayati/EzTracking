import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "src/app/Services";
import { Toastr, TOASTR_TOKEN } from "src/app/common";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";

@Component({
  selector: "ez-lgoin",
  templateUrl: "./lgoin.component.html",
  styleUrls: ["./lgoin.component.css"]
})
export class LgoinComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: string = "";

  constructor(
    private fb:FormBuilder,
    private authServices: AuthenticationService,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null,[Validators.required,Validators.email]],
      password: [null,[Validators.required]]
    });
  }

  login() {
    this.spinner.show();
    const email=this.loginForm.get('email').value
    const pw=this.loginForm.get('password').value
    this.authServices.login(email, pw).subscribe(
      (data: any) => {
        var userInfo = {
          roles: data.roles,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          shift:data.shift,
          badge: data.badge,
          building: data.building,
          userClaims:data.userClaims
        };
        localStorage.setItem("userToken", data.access_token);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        this.spinner.hide();
        this.router.navigate(["/home"]);
        // this.loginForm.reset();
        // this.toastr.success("User registration succeeded");
      },
      (err: any) => {
        this.spinner.hide();
        this.toastr.error(err.error["error_description"]||'Something bad happened');
        this.errorMsg = err.error["error_description"];
      }
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


/* 
error: "uncomfirmed_account"
error_description: "The user's account has not been activated. Please check your email."
*/