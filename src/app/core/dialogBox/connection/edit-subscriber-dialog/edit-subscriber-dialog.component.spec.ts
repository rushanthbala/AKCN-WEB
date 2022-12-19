import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubscriberDialogComponent } from './edit-subscriber-dialog.component';

describe('EditSubscriberDialogComponent', () => {
  let component: EditSubscriberDialogComponent;
  let fixture: ComponentFixture<EditSubscriberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSubscriberDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSubscriberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
