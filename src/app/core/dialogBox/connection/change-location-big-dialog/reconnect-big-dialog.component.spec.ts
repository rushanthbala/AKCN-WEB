import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconnectBigDialogComponent } from './reconnect-big-dialog.component';

describe('ReconnectBigDialogComponent', () => {
  let component: ReconnectBigDialogComponent;
  let fixture: ComponentFixture<ReconnectBigDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconnectBigDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReconnectBigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
