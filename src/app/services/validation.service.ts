import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  //Validação para dos inputs da tela de cadastro

  fullNameValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value.trim();
      const parts = value.split(' ');
      const hasValidParts = parts.length >= 2 && parts[1].length >= 4;
      const isValid = /^[a-zA-Z\s]+$/.test(value) && hasValidParts;
      return isValid ? null : { 'invalidFullName': { value: control.value } };
    };
  }

  emailValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const isValid = /@/.test(value) && /\.com$/.test(value);
      return isValid ? null : { 'invalidEmail': { value: control.value } };
    };
  }

  telefoneValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const hasRepeatedNumbers = /(.)\1{4,}/.test(value);
      return hasRepeatedNumbers ? { 'invalidTelefone': { value: control.value } } : null;
    };
  }

  logradouroValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value.trim();
      const isValid = value.length >= 10;
      return isValid ? null : { 'invalidLogradouro': { value: control.value } };
    };
  }

  nlogradouroValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value.trim();
      const isValid = value.length >= 6;
      return isValid ? null : { 'invalidNLogradouro': { value: control.value } };
    };
  }

  cidadeValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value.trim();
      const isValid = value.length >= 5;
      return isValid ? null : { 'invalidCidade': { value: control.value } };
    };
  }

  ufValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value.trim();
      const isValid = /^[a-zA-Z]{2}$/.test(value);
      return isValid ? null : { 'invalidUF': { value: control.value } };
    };
  }

  passwordValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const isValid = hasUpperCase && hasSpecialCharacter;
      return isValid ? null : { 'invalidPassword': { value: control.value } };
    };
  }

  matchPassword(group: FormGroup): ValidationErrors | null {
    const password = group.get('senha')?.value;
    const confirmPassword = group.get('confirmarsenha')?.value;
    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }
  
}
