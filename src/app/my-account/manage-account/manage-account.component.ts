import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {
  userForm: FormGroup;
  isEditing: { [key: string]: boolean } = {};
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      no_nome_completo: [{ value: '', disabled: true }],
      nu_telefone: [{ value: '', disabled: true }],
      cep: [{ value: '', disabled: true }],
      no_logradouro: [{ value: '', disabled: true }],
      nu_logradouro: [{ value: '', disabled: true }],
      de_complemento: [{ value: '', disabled: true }],
      no_cidade: [{ value: '', disabled: true }],
      no_uf: [{ value: '', disabled: true }]
    });

    this.isEditing = {
      no_nome_completo: false,
      nu_telefone: false,
      cep: false,
      no_logradouro: false,
      nu_logradouro: false,
      de_complemento: false,
      no_cidade: false,
      no_uf: false
    };
  }

  ngOnInit(): void {
    this.userService.getUserData().subscribe({
      next: (userData) => {
        this.userForm.patchValue({
          no_nome_completo: userData.no_nome_completo,
          nu_telefone: userData.nu_telefone,
          cep: userData.cep,
          no_logradouro: userData.no_logradouro,
          nu_logradouro: userData.nu_logradouro,
          de_complemento: userData.de_complemento,
          no_cidade: userData.no_cidade,
          no_uf: userData.no_uf
        });
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar dados do usuário. Verifique se você está autenticado.';
        console.error('Erro ao carregar dados do usuário:', error);
      }
    });
  }

  toggleEdit(field: string) {
    this.isEditing[field] = !this.isEditing[field];
    const control = this.userForm.get(field);
    if (this.isEditing[field]) {
      control?.enable();
    } else {
      control?.disable();
    }
  }

  // saveChanges() {
  //   if (this.userForm.valid) {
  //     // Lógica para salvar as mudanças
  //     console.log(this.userForm.value);
  //   }
  // }
}
