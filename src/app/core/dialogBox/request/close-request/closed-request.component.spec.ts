import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedRequestComponent } from './closed-request.component';

describe('ClosedRequestComponent', () => {
  let component: ClosedRequestComponent;
  let fixture: ComponentFixture<ClosedRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosedRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClosedRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
