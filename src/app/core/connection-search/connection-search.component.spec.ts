import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionSearchComponent } from './connection-search.component';

describe('ConnectionSearchComponent', () => {
  let component: ConnectionSearchComponent;
  let fixture: ComponentFixture<ConnectionSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
