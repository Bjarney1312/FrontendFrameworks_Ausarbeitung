import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReptileDetailsComponent } from './reptile-details.component';

describe('ReptileDetailsComponent', () => {
  let component: ReptileDetailsComponent;
  let fixture: ComponentFixture<ReptileDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReptileDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReptileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
