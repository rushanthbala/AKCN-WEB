import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadDialogComponent } from './road-dialog.component';

describe('RoadDialogComponent', () => {
  let component: RoadDialogComponent;
  let fixture: ComponentFixture<RoadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
