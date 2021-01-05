import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDeleteComponent } from './sales-delete.component';

describe('SalesDeleteComponent', () => {
  let component: SalesDeleteComponent;
  let fixture: ComponentFixture<SalesDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
