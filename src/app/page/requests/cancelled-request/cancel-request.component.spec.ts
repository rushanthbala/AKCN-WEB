import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledRequestComponent } from './cancel-request.component';

describe('CancelledRequestComponent', () => {
  let component: CancelledRequestComponent;
  let fixture: ComponentFixture<CancelledRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelledRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelledRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
