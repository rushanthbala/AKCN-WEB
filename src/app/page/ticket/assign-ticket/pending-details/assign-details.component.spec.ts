import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDetailsComponent } from './assign-details.component';

describe('AssignDetailsComponent', () => {
  let component: AssignDetailsComponent;
  let fixture: ComponentFixture<AssignDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
