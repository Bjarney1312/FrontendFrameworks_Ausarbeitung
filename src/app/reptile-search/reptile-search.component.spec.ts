import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReptileSearchComponent } from './reptile-search.component';

describe('ReptileSearchComponent', () => {
  let component: ReptileSearchComponent;
  let fixture: ComponentFixture<ReptileSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReptileSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReptileSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
