import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRequestDetailsComponent } from './assign-request-details.component';

describe('AssignRequestDetailsComponent', () => {
  let component: AssignRequestDetailsComponent;
  let fixture: ComponentFixture<AssignRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignRequestDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
