import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterConnectionComponent } from './alter-connection.component';

describe('AlterConnectionComponent', () => {
  let component: AlterConnectionComponent;
  let fixture: ComponentFixture<AlterConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterConnectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
