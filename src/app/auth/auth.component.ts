import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if(!authForm.valid) {
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if(this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      responseData => {
        console.log(responseData);
        this.error = null;
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, errorRes => {
        console.log(errorRes);
        this.error = errorRes;
        this.isLoading = false;
      }
    );

    authForm.reset();
  }

  onHandleError() {
    this.error = null;
  }
}
