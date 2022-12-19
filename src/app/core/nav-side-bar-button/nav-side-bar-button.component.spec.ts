import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSideBarButtonComponent } from './nav-side-bar-button.component';

describe('NavSideBarButtonComponent', () => {
  let component: NavSideBarButtonComponent;
  let fixture: ComponentFixture<NavSideBarButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavSideBarButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavSideBarButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
