import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParkingSlotComponent } from './list-parking-slot.component';

describe('ListParkingSlotComponent', () => {
  let component: ListParkingSlotComponent;
  let fixture: ComponentFixture<ListParkingSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListParkingSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListParkingSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
