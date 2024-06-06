import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstablishmentService } from 'src/app/establishment.service';
import { establishmentCategoryService } from 'src/app/establishmentCategory.service';

export interface CategoriaEstabelecimento {
  id_categoria: number;
  no_categoria: string;
}

@Component({
  selector: 'app-register-establishment',
  templateUrl: './register-establishment.component.html',
  styleUrls: ['./register-establishment.component.css']
})
export class RegisterEstablishmentComponent {
  establishmentForm: FormGroup;
  errorMessage: string = ''
  categorias: CategoriaEstabelecimento[] = []

  constructor(
    private formBuilder: FormBuilder,
    private establishmentService : EstablishmentService,
    private establishmentCategoryService: establishmentCategoryService
  ) {}

  ngOnInit(): void {
    this.establishmentForm = this.formBuilder.group({
      no_estabelecimento: ['', Validators.required],
      tp_estabelecimento: ['', [Validators.required, Validators.min(0)]],
      no_logradouro: ['', [Validators.required, Validators.min(0)]],
      no_uf: ['', [Validators.required, Validators.min(0)]],
      no_cidade: ['', Validators.required],
      de_complemento: ['', Validators.required],
      nu_logradouro: ['', Validators.required],
      nu_telefone: ['', Validators.required]
    });

    this.establishmentCategoryService.getCategories().subscribe(
      (data: CategoriaEstabelecimento[]) => {
        console.log(data)
        this.categorias = data;
      },
      (error: any) => {
        console.error('Erro ao buscar categorias', error)
      }
    )

}



onSubmit(): void {
  console.log('AQUI DEU CERTO')
  if(this.establishmentForm.valid) {
    const { no_estabelecimento, tp_estabelecimento, no_logradouro, no_uf, no_cidade, de_complemento, nu_logradouro, nu_telefone} = this.establishmentForm.value;
    this.establishmentService.registerEstablishment(no_estabelecimento, tp_estabelecimento, no_logradouro, no_uf, no_cidade, de_complemento, nu_logradouro, nu_telefone).subscribe(
      response => {
        console.log('Register successful:', response);
        // this.router.navigate(['/home']);
      },
      error => {
        console.error('Register Failed', error);
        this.errorMessage = error;
      }
    )
  }
}


}

