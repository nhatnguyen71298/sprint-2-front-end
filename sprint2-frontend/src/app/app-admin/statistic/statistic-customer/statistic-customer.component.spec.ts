import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticCustomerComponent } from './statistic-customer.component';

describe('StatisticCustomerComponent', () => {
  let component: StatisticCustomerComponent;
  let fixture: ComponentFixture<StatisticCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
