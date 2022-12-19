import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseRequestComponent } from './close-request.component';

describe('CloseRequestComponent', () => {
  let component: CloseRequestComponent;
  let fixture: ComponentFixture<CloseRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
