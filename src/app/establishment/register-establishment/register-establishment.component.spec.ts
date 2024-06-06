import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEstablishmentComponent } from './register-establishment.component';

describe('RegisterEstablishmentComponent', () => {
  let component: RegisterEstablishmentComponent;
  let fixture: ComponentFixture<RegisterEstablishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterEstablishmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterEstablishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
