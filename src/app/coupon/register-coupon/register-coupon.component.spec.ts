import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCouponComponent } from './register-coupon.component';

describe('RegisterCouponComponent', () => {
  let component: RegisterCouponComponent;
  let fixture: ComponentFixture<RegisterCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCouponComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
