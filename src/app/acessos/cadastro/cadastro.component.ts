import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { usuario } from './models/usuario';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/validation.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit{

  cadastroForm: FormGroup;
  errorMessage: string = '';
  usuario: usuario;
  formResult: string = ''

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private validationService: ValidationService,
  ) { }

  ngOnInit(): void {

    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, this.validationService.fullNameValidator()]],
      email: ['', [Validators.required, Validators.email, this.validationService.emailValidator()]],
      telefone: ['', [Validators.required, this.validationService.telefoneValidator()]],
      cep: ['', [Validators.required]],
      logradouro: ['', [Validators.required, this.validationService.logradouroValidator()]],
      nlogradouro: ['', [Validators.required]],
      cidade: ['',[ Validators.required, this.validationService.cidadeValidator()]],
      complemento: ['', [Validators.required]],
      uf: ['', [Validators.required, this.validationService.ufValidator]],
      senha: ['', [Validators.required, this.validationService.passwordValidator()]],
      confirmarsenha: ['', [Validators.required]]
    }, { validator: this.validationService.matchPassword });
  }

  adicionarUsuario() {
    this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value)
    this.formResult = JSON.stringify(this.cadastroForm.value);
  }

  onRegister(): void {
    console.log("Chamou")
    if (this.cadastroForm.valid) {
      const { email, senha, nome, telefone, logradouro, uf, cidade, complemento, nlogradouro } = this.cadastroForm.value;
      this.authService.register(email, senha, nome, telefone, logradouro, uf, cidade, complemento, nlogradouro).subscribe(
        response => {
          console.log('Register successful:', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Register failed:', error);
          this.errorMessage = error;
        }
      );
    }
}
}
