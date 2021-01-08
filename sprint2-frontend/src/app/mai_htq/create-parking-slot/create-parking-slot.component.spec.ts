import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateParkingSlotComponent } from './create-parking-slot.component';

describe('CreateParkingSlotComponent', () => {
  let component: CreateParkingSlotComponent;
  let fixture: ComponentFixture<CreateParkingSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateParkingSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateParkingSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
