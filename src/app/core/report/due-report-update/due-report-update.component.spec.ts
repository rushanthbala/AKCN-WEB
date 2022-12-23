import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueReportUpdateComponent } from './due-report-update.component';

describe('DueReportUpdateComponent', () => {
  let component: DueReportUpdateComponent;
  let fixture: ComponentFixture<DueReportUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DueReportUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DueReportUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
