import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueReportTableComponent } from './due-report-table.component';

describe('DueReportTableComponent', () => {
  let component: DueReportTableComponent;
  let fixture: ComponentFixture<DueReportTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DueReportTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DueReportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
