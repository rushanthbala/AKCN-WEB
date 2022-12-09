import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCancelDialogBoxComponent } from './ticket-cancel-dialog-box.component';

describe('TicketCancelDialogBoxComponent', () => {
  let component: TicketCancelDialogBoxComponent;
  let fixture: ComponentFixture<TicketCancelDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketCancelDialogBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketCancelDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
