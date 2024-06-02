import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,10])]);

    this.loginForm = this.fb.group({
      email: ['',[Validators.required, CustomValidators.email]],
      senha: senha,


    });
  }

  onLogin(): void {
    console.log("Chamou")
    if (this.loginForm.valid) {
      const { email, senha } = this.loginForm.value;
      this.authService.login(email, senha).subscribe(
        response => {
          console.log('Login successful:', response);
          // this.router.navigate(['/home']);
        },
        error => {
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid email or password';
        }
      );
    }
  }


}
