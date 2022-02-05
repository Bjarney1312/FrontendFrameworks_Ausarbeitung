import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReptileDashboardComponent } from './reptile-dashboard.component';

describe('ReptileDashboardComponent', () => {
  let component: ReptileDashboardComponent;
  let fixture: ComponentFixture<ReptileDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReptileDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReptileDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
