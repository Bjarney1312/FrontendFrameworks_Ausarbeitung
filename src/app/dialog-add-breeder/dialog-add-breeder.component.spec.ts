import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddBreederComponent } from './dialog-add-breeder.component';

describe('DialogAddBreederComponent', () => {
  let component: DialogAddBreederComponent;
  let fixture: ComponentFixture<DialogAddBreederComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddBreederComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddBreederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
