import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditBreederComponent } from './dialog-edit-breeder.component';

describe('DialogEditBreederComponent', () => {
  let component: DialogEditBreederComponent;
  let fixture: ComponentFixture<DialogEditBreederComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditBreederComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditBreederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
