import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class LoginPageComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription
  form: FormGroup

  constructor(
    public authService: AuthService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        console.log(authStatus)
      }
    )

    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      password: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] })
    });
  }

  onLogin() {
    if (this.form.invalid) return;
    const {email, password} = this.form.value
    this.authService.onLogin(email, password)
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe()
  }

}
