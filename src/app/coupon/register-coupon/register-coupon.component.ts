import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-coupon',
  templateUrl: './register-coupon.component.html',
  styleUrls: ['./register-coupon.component.css']
})
export class RegisterCouponComponent implements OnInit {
  couponForm: FormGroup;
  fileError: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.couponForm = this.formBuilder.group({
      couponName: ['', Validators.required],
      originalValue: ['', [Validators.required, Validators.min(0)]],
      discountValue: ['', [Validators.required, Validators.min(0)]],
      expirationDate: ['', Validators.required],
      imageUrl: [null, Validators.required],
      shortDescription: ['', Validators.required],
      fullDescription: ['', Validators.required]
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.couponForm.patchValue({
        imageUrl: file
      });
      this.fileError = false;
    } else {
      this.fileError = true;
    }
  }

  onSubmit(): void {
    if (this.couponForm.valid) {
      const formData = new FormData();
      formData.append('couponName', this.couponForm.get('couponName')?.value);
      formData.append('originalValue', this.couponForm.get('originalValue')?.value);
      formData.append('discountValue', this.couponForm.get('discountValue')?.value);
      formData.append('expirationDate', this.couponForm.get('expirationDate')?.value);
      formData.append('imageUrl', this.couponForm.get('imageUrl')?.value);
      formData.append('shortDescription', this.couponForm.get('shortDescription')?.value);
      formData.append('fullDescription', this.couponForm.get('fullDescription')?.value);

      console.log('Form Submitted!', formData);
    } else {
      this.fileError = !this.couponForm.get('imageUrl')?.value;
      
    }
  }
}
