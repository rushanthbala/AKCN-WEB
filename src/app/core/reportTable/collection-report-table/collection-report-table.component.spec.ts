import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionReportTableComponent } from './collection-report-table.component';

describe('CollectionReportTableComponent', () => {
  let component: CollectionReportTableComponent;
  let fixture: ComponentFixture<CollectionReportTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionReportTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionReportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
