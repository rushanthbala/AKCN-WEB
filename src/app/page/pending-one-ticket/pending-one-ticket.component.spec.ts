import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingOneTicketComponent } from './pending-one-ticket.component';

describe('PendingOneTicketComponent', () => {
  let component: PendingOneTicketComponent;
  let fixture: ComponentFixture<PendingOneTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingOneTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingOneTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
