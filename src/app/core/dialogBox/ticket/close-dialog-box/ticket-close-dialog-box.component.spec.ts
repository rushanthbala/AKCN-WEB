import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCloseDialogBoxComponent } from './ticket-close-dialog-box.component';

describe('TicketCloseDialogBoxComponent', () => {
  let component: TicketCloseDialogBoxComponent;
  let fixture: ComponentFixture<TicketCloseDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketCloseDialogBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketCloseDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
