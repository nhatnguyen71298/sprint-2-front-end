import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredCarDeleteComponent } from './registered-car-delete.component';

describe('RegisteredCarDeleteComponent', () => {
  let component: RegisteredCarDeleteComponent;
  let fixture: ComponentFixture<RegisteredCarDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredCarDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredCarDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
