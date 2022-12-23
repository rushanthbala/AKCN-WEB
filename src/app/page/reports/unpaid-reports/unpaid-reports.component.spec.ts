import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpaidReportsComponent } from './unpaid-reports.component';

describe('UnpaidReportsComponent', () => {
  let component: UnpaidReportsComponent;
  let fixture: ComponentFixture<UnpaidReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnpaidReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnpaidReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
