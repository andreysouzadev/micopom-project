import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { categoryService } from 'src/app/services/category.service';
import { EstablishmentService } from 'src/app/services/establishment.service';
import { CouponService } from 'src/app/services/coupons.service';
import { Router } from '@angular/router';


export interface Categorias {
  id_categoria: number;
  no_categoria: string;
};

export interface Estabelecimento {
  id_estabelecimento: number;
  no_estabelecimento: string;
};

@Component({
  selector: 'app-register-coupon',
  templateUrl: './register-coupon.component.html',
  styleUrls: ['./register-coupon.component.css']
})



export class RegisterCouponComponent implements OnInit {
  couponForm: FormGroup;
  fileError: boolean = false;
  fileLimitExceeded: boolean = false;
  categorias: Categorias[] = []
  estabelecimentos: Estabelecimento[] = []
  errorMessage: string = ""
  selectedFiles: File[];
  mainFile: File;
  cupomInserido: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private CategoryService: categoryService,
    private EstablishmentService: EstablishmentService,
    private CouponService: CouponService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.couponForm = this.formBuilder.group({
      couponName: ['', Validators.required],
      originalValue: ['', [Validators.required, Validators.min(0)]],
      cuponQuantity: ['', [Validators.required, Validators.min(0)]],
      discountValue: ['', [Validators.required, Validators.min(0)]],
      repasseValue: ['', [Validators.required, Validators.min(0)]],
      expirationDate: ['', Validators.required],
      // imageUrl: [null, Validators.required],
      shortDescription: ['', Validators.required],
      establishmentList: ['', Validators.required],
      categoryList: ['', Validators.required],
      fullDescription: ['', Validators.required],
      files: [''],
      mainFile: ['']
    });

    this.CategoryService.getCategories().subscribe(
      (data: Categorias[]) => {
        this.categorias = data;
      },
      (error: any) => {
        console.error('Erro ao buscar categorias', error)
      }
    )

    this.EstablishmentService.getEstablishments().subscribe(
      (data: Estabelecimento[]) => {
        this.estabelecimentos = data;
      },
      (error: any) => {
        console.error('Erro ao buscar estabelecimentos', error)
      }
    )

  }

  onMainFileChange(event: any): void {
    const file = event.target.files[0];
    if (!file) {
      this.fileError = true;
      
    } else {
      this.mainFile = file
      this.fileError = false;
    }
  }

  onFileChange(event: any): void {
    
    if(event.target.files.length > 3){
      this.fileLimitExceeded = true;
    } else {
      this.fileLimitExceeded = false;
      if (event.target.files.length === 0) {
        this.fileError = true;
        
      } else {
        this.selectedFiles = event.target.files;
        this.fileError = false;
      }
    }
    
  }

  onSubmit(): void {
    if (this.couponForm.valid) {
        const { shortDescription, originalValue, discountValue, repasseValue, expirationDate, cuponQuantity, imageUrl, fullDescription, couponName, categoryList, establishmentList } = this.couponForm.value;
        this.CouponService.registerCoupon(
          {shortDescription, originalValue, discountValue, repasseValue, expirationDate, cuponQuantity, imageUrl, fullDescription, couponName, categoryList, establishmentList},
          this.mainFile,
          this.selectedFiles
        ).subscribe(  
          response => {
          },
          error => {
            console.error('Register failed:', error);
            this.errorMessage = error;
          }
          
        );
        this.cupomInserido = true;
        this.couponForm.reset();
        setTimeout(() => this.cupomInserido = false, 5000);
    } else {
      this.fileError = !this.couponForm.get('imageUrl')?.value;

    }



  }
}
