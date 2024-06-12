import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { usuario } from './models/usuario';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';


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
  ) { }

  ngOnInit(): void {

    let senha = new FormControl('', [Validators.required,]);
    let confirmarsenha = new FormControl('', [Validators.required,]);

    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required,]],
      email: ['',[Validators.required,]],
      telefone: ['', [Validators.required,]],
      logradouro: ['', [Validators]],
      uf: ['', [Validators.required,]],
      cidade: ['', [Validators.required,]],
      complemento: ['', [Validators.required,]],
      nlogradouro: ['', [Validators.required, ]],
      senha: senha,
      confirmarsenha: confirmarsenha

    });
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
