import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCSubsciberComponent } from './add-subscriber.component';

describe('AddCSubsciberComponent', () => {
  let component: AddCSubsciberComponent;
  let fixture: ComponentFixture<AddCSubsciberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCSubsciberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCSubsciberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
