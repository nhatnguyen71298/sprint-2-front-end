import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticSalesComponent } from './statistic-sales.component';

describe('StatisticSalesComponent', () => {
  let component: StatisticSalesComponent;
  let fixture: ComponentFixture<StatisticSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
