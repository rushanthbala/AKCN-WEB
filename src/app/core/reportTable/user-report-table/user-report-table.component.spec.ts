import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReportTableComponent } from './user-report-table.component';

describe('UserReportTableComponent', () => {
  let component: UserReportTableComponent;
  let fixture: ComponentFixture<UserReportTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReportTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
