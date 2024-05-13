import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { usuario } from './models/usuario';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { CustomValidators } from 'ng2-validation';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit{

  cadastroForm: FormGroup;
  usuario: usuario;
  formResult: string = '';
  MASKS =  MASKS;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,10])]);
    let confirmarsenha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,10]), CustomValidators.equalTo(senha)]);

    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, CustomValidators.rangeLength([10,30])]],
      email: ['',[Validators.required, CustomValidators.email]],
      telefone: ['', [Validators.required, NgBrazilValidators.telefone]],
      logradouro: ['', [Validators.required, CustomValidators.rangeLength([5,100])]],
      uf: ['', [Validators.required, CustomValidators.rangeLength([2,2])]],
      cidade: ['', [Validators.required, CustomValidators.rangeLength([2,10])]],
      complemento: ['', [Validators.required, CustomValidators.rangeLength([5,100])]],
      nlogradouro: ['', [Validators.required, ]],
      senha: senha,
      confirmarsenha: confirmarsenha

    });
  }

  adicionarUsuario() {
    this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value)
    this.formResult = JSON.stringify(this.cadastroForm.value);
  }
}
