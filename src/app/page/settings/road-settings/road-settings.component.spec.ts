import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadSettingsComponent } from './road-settings.component';

describe('RoadSettingsComponent', () => {
  let component: RoadSettingsComponent;
  let fixture: ComponentFixture<RoadSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
