import { Component } from '@angular/core';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { CustomValidators } from 'ng2-validation';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-esqueceu-senha',
  templateUrl: './esqueceu-senha.component.html',
  styleUrls: ['./esqueceu-senha.component.css']
})
export class EsqueceuSenhaComponent {

  esqueceusenhaForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.esqueceusenhaForm = this.fb.group({
      email: ['',[Validators.required, CustomValidators.email]],
 
    })
}

}
