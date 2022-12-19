import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePaymentDetailsComponent } from './make-payment-details.component';

describe('MakePaymentDetailsComponent', () => {
  let component: MakePaymentDetailsComponent;
  let fixture: ComponentFixture<MakePaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakePaymentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakePaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
