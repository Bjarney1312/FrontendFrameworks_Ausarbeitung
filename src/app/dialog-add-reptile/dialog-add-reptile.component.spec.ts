import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddReptileComponent } from './dialog-add-reptile.component';

describe('DialogAddReptileComponent', () => {
  let component: DialogAddReptileComponent;
  let fixture: ComponentFixture<DialogAddReptileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddReptileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddReptileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
