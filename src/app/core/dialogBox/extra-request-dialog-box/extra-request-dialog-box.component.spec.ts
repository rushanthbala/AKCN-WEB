import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraRequestDialogBoxComponent } from './extra-request-dialog-box.component';

describe('ExtraRequestDialogBoxComponent', () => {
  let component: ExtraRequestDialogBoxComponent;
  let fixture: ComponentFixture<ExtraRequestDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraRequestDialogBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtraRequestDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
