import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticOverviewComponent } from './statistic-overview.component';

describe('StatisticOverviewComponent', () => {
  let component: StatisticOverviewComponent;
  let fixture: ComponentFixture<StatisticOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
