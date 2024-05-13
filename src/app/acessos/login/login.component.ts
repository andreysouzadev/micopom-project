import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { CustomValidators } from 'ng2-validation';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,10])]);

    this.loginForm = this.fb.group({
      email: ['',[Validators.required, CustomValidators.email]],
      senha: senha,


    });
  }


}
