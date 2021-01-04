import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup

  constructor(
    private authService: AuthService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    

    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      password: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] })
    });
  }

  onLogin() {
    if (this.form.invalid) return;
    const {email, password} = this.form.value
    this.authService.onLogin(email, password)
    .subscribe(result => {
      localStorage.setItem("secret", result.secret)
      localStorage.setItem("userId", result.instance['@ref'].id)
      localStorage.setItem("isLogin", true)
      this.router.navigate(["/"])
    })
  }

}
