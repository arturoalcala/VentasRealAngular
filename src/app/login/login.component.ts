import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiauthService } from '../services/apiauth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    public apiAuth: ApiauthService,
    private router: Router,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder) {
    // if (this.apiAuth.usuarioData != null)
    //   this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }

  login() {
    this.apiAuth.login(this.loginForm.value).subscribe(response => {
      if (response.success == 1) {
        this.snackBar.open(
          "Bienvenid@",
          "",
          { duration: 2000 });
        this.router.navigate(['/']);
      }
    });
  }
}
