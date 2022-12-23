import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionReportUpdateComponent } from './collection-report-update.component';

describe('CollectionReportUpdateComponent', () => {
  let component: CollectionReportUpdateComponent;
  let fixture: ComponentFixture<CollectionReportUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionReportUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionReportUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
