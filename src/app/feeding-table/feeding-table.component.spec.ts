import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedingTableComponent } from './feeding-table.component';

describe('FeedingTableComponent', () => {
  let component: FeedingTableComponent;
  let fixture: ComponentFixture<FeedingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedingTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
