import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostPut } from './user-dialog.component';

describe('UserPostPut', () => {
  let component: UserPostPut;
  let fixture: ComponentFixture<UserPostPut>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPostPut ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPostPut);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
