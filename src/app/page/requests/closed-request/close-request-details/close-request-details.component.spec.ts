import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseRequestDetailsComponent } from './close-request-details.component';

describe('CloseRequestDetailsComponent', () => {
  let component: CloseRequestDetailsComponent;
  let fixture: ComponentFixture<CloseRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseRequestDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
