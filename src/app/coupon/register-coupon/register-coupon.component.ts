import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { categoryService } from 'src/app/category.service';
import { RegisterCouponService } from 'src/app/auth/register-coupon.service';


export interface Categorias {
  id_categoria: number;
  no_categoria: string;
};

@Component({
  selector: 'app-register-coupon',
  templateUrl: './register-coupon.component.html',
  styleUrls: ['./register-coupon.component.css']
})



export class RegisterCouponComponent implements OnInit {
  couponForm: FormGroup;
  fileError: boolean = false;
  categorias: Categorias[] = []
  errorMessage: string = ""
  selectedFile: File;

  constructor(
    private formBuilder: FormBuilder,
    private CategoryService: categoryService,
    private registerCouponService: RegisterCouponService
  ) {}

  ngOnInit(): void {
    this.couponForm = this.formBuilder.group({
      couponName: ['', Validators.required],
      originalValue: ['', [Validators.required, Validators.min(0)]],
      cuponQuantity: ['', [Validators.required, Validators.min(0)]],
      discountValue: ['', [Validators.required, Validators.min(0)]],
      expirationDate: ['', Validators.required],
      // imageUrl: [null, Validators.required],
      shortDescription: ['', Validators.required],
      categoryList: ['', Validators.required],
      fullDescription: ['', Validators.required]
    });

    this.CategoryService.getCategories().subscribe(
      (data: Categorias[]) => {
        console.log(data)
        this.categorias = data;
      },
      (error: any) => {
        console.error('Erro ao buscar categorias', error)
      }
    )

  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.fileError = false;
    } else {
      this.fileError = true;
    }
  }

  onSubmit(): void {
    console.log("chamou")
    if (this.couponForm.valid) {

      //Submeteu
        const { shortDescription, originalValue, discountValue, expirationDate, cuponQuantity, imageUrl, fullDescription, couponName, categoryList } = this.couponForm.value;
        // console.log(this.couponForm.value)
        // console.log(imageUrl)
        this.registerCouponService.registerCoupon(
          {shortDescription, originalValue, discountValue, expirationDate, cuponQuantity, imageUrl, fullDescription, couponName, categoryList},
          this.selectedFile
        ).subscribe(  
          response => {
            console.log('Register successful:', response);
            // this.router.navigate(['/home']);
          },
          error => {
            console.error('Register failed:', error);
            this.errorMessage = error;
          }
        );
    } else {
      this.fileError = !this.couponForm.get('imageUrl')?.value;

    }



  }
}
