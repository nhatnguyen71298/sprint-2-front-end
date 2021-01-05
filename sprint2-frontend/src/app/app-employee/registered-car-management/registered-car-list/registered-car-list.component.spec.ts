import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredCarListComponent } from './registered-car-list.component';

describe('RegisteredCarListComponent', () => {
  let component: RegisteredCarListComponent;
  let fixture: ComponentFixture<RegisteredCarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredCarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredCarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
