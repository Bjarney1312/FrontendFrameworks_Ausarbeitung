import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddWeightComponent } from './dialog-add-weight.component';

describe('DialogAddWeightComponent', () => {
  let component: DialogAddWeightComponent;
  let fixture: ComponentFixture<DialogAddWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddWeightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
