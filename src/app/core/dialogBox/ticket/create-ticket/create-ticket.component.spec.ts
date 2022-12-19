import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTicketComponentDialog } from './create-ticket.component';

describe('CreateTicketComponentDialog', () => {
  let component: CreateTicketComponentDialog;
  let fixture: ComponentFixture<CreateTicketComponentDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTicketComponentDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTicketComponentDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
