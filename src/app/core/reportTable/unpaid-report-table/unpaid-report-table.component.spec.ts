import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpaidReportTableComponent } from './unpaid-report-table.component';

describe('UnpaidReportTableComponent', () => {
  let component: UnpaidReportTableComponent;
  let fixture: ComponentFixture<UnpaidReportTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnpaidReportTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnpaidReportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
