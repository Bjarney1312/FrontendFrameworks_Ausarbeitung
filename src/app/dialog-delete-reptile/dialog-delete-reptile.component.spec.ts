import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteReptileComponent } from './dialog-delete-reptile.component';

describe('DialogDeleteReptileComponent', () => {
  let component: DialogDeleteReptileComponent;
  let fixture: ComponentFixture<DialogDeleteReptileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteReptileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteReptileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
