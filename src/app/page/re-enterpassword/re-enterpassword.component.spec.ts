import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReEnterpasswordComponent } from './re-enterpassword.component';

describe('ReEnterpasswordComponent', () => {
  let component: ReEnterpasswordComponent;
  let fixture: ComponentFixture<ReEnterpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReEnterpasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReEnterpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
