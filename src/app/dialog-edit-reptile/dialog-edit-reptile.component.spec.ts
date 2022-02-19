import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditReptileComponent } from './dialog-edit-reptile.component';

describe('DialogEditReptileComponent', () => {
  let component: DialogEditReptileComponent;
  let fixture: ComponentFixture<DialogEditReptileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditReptileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditReptileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
