// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { UserService } from 'src/app/services/user.service';

// @Component({
//   selector: 'app-manage-account',
//   templateUrl: './manage-account.component.html',
//   styleUrls: ['./manage-account.component.css']
// })
// export class ManageAccountComponent implements OnInit {
//   userForm: FormGroup;
//   isEditing: { [key: string]: boolean } = {};
//   errorMessage: string | null = null;
//   successMessage: string | null = null;

//   constructor(private fb: FormBuilder, private userService: UserService) {
//     this.userForm = this.fb.group({
//       no_nome_completo: [{ value: '', disabled: true }],
//       nu_telefone: [{ value: '', disabled: true }],
//       nu_cep: [{ value: '', disabled: true }],
//       no_logradouro: [{ value: '', disabled: true }],
//       nu_logradouro: [{ value: '', disabled: true }],
//       de_complemento: [{ value: '', disabled: true }],
//       no_cidade: [{ value: '', disabled: true }],
//       no_uf: [{ value: '', disabled: true }],
//       no_email: [{value: '', disabled: true}]
//     });

//     this.isEditing = {
//       no_nome_completo: false,
//       nu_telefone: false,
//       nu_cep: false,
//       no_logradouro: false,
//       nu_logradouro: false,
//       de_complemento: false,
//       no_cidade: false,
//       no_uf: false
//     };
//   }

//   ngOnInit(): void {
//     this.userService.getUserData().subscribe({
//       next: (userData) => {
//         this.userForm.patchValue({
//           no_nome_completo: userData.no_nome_completo,
//           nu_telefone: userData.nu_telefone,
//           nu_cep: userData.nu_cep,
//           no_logradouro: userData.no_logradouro,
//           nu_logradouro: userData.nu_logradouro,
//           de_complemento: userData.de_complemento,
//           no_cidade: userData.no_cidade,
//           no_uf: userData.no_uf,
//           no_email: userData.no_email
//         });
        
//       },
//       error: (error) => {
//         this.errorMessage = 'Erro ao carregar dados do usuário. Verifique se você está autenticado.';
//         console.error('Erro ao carregar dados do usuário:', error);
//       }
//     });


//   }

//   toggleEdit(field: string) {
//     this.isEditing[field] = !this.isEditing[field];
//     const control = this.userForm.get(field);
//     if (this.isEditing[field]) {
//       control?.enable();
//     } else {
//       control?.disable();
//     }
//   }

//   saveChanges() {
//     console.log('chamou')
//     if (this.userForm.valid) {
//       const updatedUserData = this.userForm.getRawValue();
//       this.userService.updateUserData(updatedUserData).subscribe({
//         next: () => {
//           this.successMessage = 'Dados atualizados com sucesso!';
//           this.errorMessage = null;
//           Object.keys(this.isEditing).forEach(key => this.isEditing[key] = false);
//           Object.keys(this.userForm.controls).forEach(key => this.userForm.get(key)?.disable());
//         },
//         error: (error) => {
//           this.errorMessage = 'Erro ao atualizar os dados. Tente novamente mais tarde.';
//           this.successMessage = null;
//           console.error('Erro ao atualizar os dados:', error);
//         }
//       });
//     }
//   }

// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {
  userForm: FormGroup;
  passwordForm: FormGroup;
  isEditing: { [key: string]: boolean } = {};
  errorMessage: string | null = null;
  successMessage: string | null = null;
  currentPasswordFieldType: string = 'password';
  newPasswordFieldType: string = 'password';
  confirmNewPasswordFieldType: string = 'password';

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      no_nome_completo: [{ value: '', disabled: true }],
      nu_telefone: [{ value: '', disabled: true }],
      nu_cep: [{ value: '', disabled: true }],
      no_logradouro: [{ value: '', disabled: true }],
      nu_logradouro: [{ value: '', disabled: true }],
      de_complemento: [{ value: '', disabled: true }],
      no_cidade: [{ value: '', disabled: true }],
      no_uf: [{ value: '', disabled: true }],
      no_email: [{value: '', disabled: true}]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });

    this.isEditing = {
      no_nome_completo: false,
      nu_telefone: false,
      nu_cep: false,
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
          nu_cep: userData.nu_cep,
          no_logradouro: userData.no_logradouro,
          nu_logradouro: userData.nu_logradouro,
          de_complemento: userData.de_complemento,
          no_cidade: userData.no_cidade,
          no_uf: userData.no_uf,
          no_email: userData.no_email
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

  saveChanges() {
    if (this.userForm.valid) {
      const updatedUserData = this.userForm.getRawValue();
      this.userService.updateUserData(updatedUserData).subscribe({
        next: () => {
          this.successMessage = 'Dados atualizados com sucesso!';
          this.errorMessage = null;
          Object.keys(this.isEditing).forEach(key => this.isEditing[key] = false);
          Object.keys(this.userForm.controls).forEach(key => this.userForm.get(key)?.disable());
        },
        error: (error) => {
          this.errorMessage = 'Erro ao atualizar os dados. Tente novamente mais tarde.';
          this.successMessage = null;
          console.error('Erro ao atualizar os dados:', error);
        }
      });
    }
  }

  changePassword() {
    console.log('chamou aqui')
    if (this.passwordForm.valid) {
      this.userService.changePassword(this.passwordForm.value).subscribe({
        next: () => {
          this.successMessage = 'Senha alterada com sucesso!';
          this.errorMessage = null;
          this.passwordForm.reset();
        },
        error: (error) => {
          this.errorMessage = error.error.msg || 'Erro ao alterar a senha. Tente novamente mais tarde.';
          this.successMessage = null;
          console.error('Erro ao alterar a senha:', error);
        }
      });
    }
  }

  checkPasswords(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmNewPassword = group.get('confirmNewPassword')?.value;

    return newPassword === confirmNewPassword ? null : { notSame: true };
  }

  togglePasswordVisibility(field: string): void {
    if (field === 'current') {
      this.currentPasswordFieldType = this.currentPasswordFieldType === 'password' ? 'text' : 'password';
    } else if (field === 'new') {
      this.newPasswordFieldType = this.newPasswordFieldType === 'password' ? 'text' : 'password';
    } else if (field === 'confirm') {
      this.confirmNewPasswordFieldType = this.confirmNewPasswordFieldType === 'password' ? 'text' : 'password';
    }
  }

}

