import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticTicketComponent } from './statistic-ticket.component';

describe('StatisticTicketComponent', () => {
  let component: StatisticTicketComponent;
  let fixture: ComponentFixture<StatisticTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
