import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpaidReportUpdateComponent } from './unpaid-report-update.component';

describe('UnpaidReportUpdateComponent', () => {
  let component: UnpaidReportUpdateComponent;
  let fixture: ComponentFixture<UnpaidReportUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnpaidReportUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnpaidReportUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
