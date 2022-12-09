import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTicketRequestDilogComponent } from './assign-ticket-request.component';

describe('AssignTicketRequestDilogComponent', () => {
  let component: AssignTicketRequestDilogComponent;
  let fixture: ComponentFixture<AssignTicketRequestDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignTicketRequestDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignTicketRequestDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
