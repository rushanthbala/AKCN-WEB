import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthYearInputComponent } from './month-year-input.component';

describe('MonthYearInputComponent', () => {
  let component: MonthYearInputComponent;
  let fixture: ComponentFixture<MonthYearInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthYearInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthYearInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
