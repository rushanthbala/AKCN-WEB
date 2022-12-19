import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSettingComponent } from './users-setting.component';

describe('UsersSettingComponent', () => {
  let component: UsersSettingComponent;
  let fixture: ComponentFixture<UsersSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
