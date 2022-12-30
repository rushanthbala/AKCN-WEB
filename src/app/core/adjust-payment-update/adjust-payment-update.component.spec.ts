import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustPaymentUpdateComponent } from './adjust-payment-update.component';

describe('AdjustPaymentUpdateComponent', () => {
  let component: AdjustPaymentUpdateComponent;
  let fixture: ComponentFixture<AdjustPaymentUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdjustPaymentUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdjustPaymentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
