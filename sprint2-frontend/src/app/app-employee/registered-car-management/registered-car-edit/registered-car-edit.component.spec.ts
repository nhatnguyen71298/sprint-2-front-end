import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredCarEditComponent } from './registered-car-edit.component';

describe('RegisteredCarEditComponent', () => {
  let component: RegisteredCarEditComponent;
  let fixture: ComponentFixture<RegisteredCarEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredCarEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredCarEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
