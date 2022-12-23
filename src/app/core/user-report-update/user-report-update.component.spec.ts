import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReportUpdateComponent } from './user-report-update.component';

describe('UserReportUpdateComponent', () => {
  let component: UserReportUpdateComponent;
  let fixture: ComponentFixture<UserReportUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReportUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReportUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
