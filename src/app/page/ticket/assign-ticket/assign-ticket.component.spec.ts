import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTicketComponent } from './assign-ticket.component';

describe('PendingTicketComponent', () => {
  let component: PendingTicketComponent;
  let fixture: ComponentFixture<PendingTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
