import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteBreederComponent } from './dialog-delete-breeder.component';

describe('DialogDeleteBreederComponent', () => {
  let component: DialogDeleteBreederComponent;
  let fixture: ComponentFixture<DialogDeleteBreederComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteBreederComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteBreederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
