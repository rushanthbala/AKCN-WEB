import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueReportComponent } from './due-report.component';

describe('DueReportComponent', () => {
  let component: DueReportComponent;
  let fixture: ComponentFixture<DueReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DueReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DueReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
