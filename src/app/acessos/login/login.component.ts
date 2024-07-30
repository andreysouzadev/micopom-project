import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('email') emailInput: ElementRef;
  loginForm: FormGroup;
  errorMessage: string = '';
  passwordFieldType: string = 'password';
  errorLogin: boolean = false;
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  ngOnInit(): void {

    let senha = new FormControl('', [Validators.required,]);

    this.loginForm = this.fb.group({
      email: ['',[Validators.required,]],
      senha: senha,


    });
  }

  async onLogin(){
    if (this.loginForm.valid) {
      const { email, senha } = this.loginForm.value;
      const result = await this.authService.login(email, senha).toPromise();
      if(result === 200){
        this.router.navigate([this.returnUrl]);
      } else if(result === 204){
        this.errorLogin = true;

        this.loginForm.reset();
        this.emailInput.nativeElement.focus();
      }
    }
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }



}
