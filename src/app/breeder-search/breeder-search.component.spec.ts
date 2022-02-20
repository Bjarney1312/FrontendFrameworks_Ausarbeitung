import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreederSearchComponent } from './breeder-search.component';

describe('BreederSearchComponent', () => {
  let component: BreederSearchComponent;
  let fixture: ComponentFixture<BreederSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreederSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreederSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
