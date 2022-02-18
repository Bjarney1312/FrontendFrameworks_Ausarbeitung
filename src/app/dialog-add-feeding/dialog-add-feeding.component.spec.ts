import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddFeedingComponent } from './dialog-add-feeding.component';

describe('DialogAddFeedingComponent', () => {
  let component: DialogAddFeedingComponent;
  let fixture: ComponentFixture<DialogAddFeedingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddFeedingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddFeedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
