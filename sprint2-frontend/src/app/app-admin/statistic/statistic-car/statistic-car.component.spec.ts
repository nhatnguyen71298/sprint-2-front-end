import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticCarComponent } from './statistic-car.component';

describe('StatisticCarComponent', () => {
  let component: StatisticCarComponent;
  let fixture: ComponentFixture<StatisticCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
