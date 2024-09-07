import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountsCouponsComponent } from './discounts-coupons.component';

describe('DiscountsCouponsComponent', () => {
  let component: DiscountsCouponsComponent;
  let fixture: ComponentFixture<DiscountsCouponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountsCouponsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountsCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
