import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllConnectionComponent } from './all-connection.component';

describe('AllConnectionComponent', () => {
  let component: AllConnectionComponent;
  let fixture: ComponentFixture<AllConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllConnectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
