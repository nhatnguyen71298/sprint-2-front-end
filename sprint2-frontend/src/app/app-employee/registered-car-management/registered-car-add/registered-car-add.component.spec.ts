import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredCarAddComponent } from './registered-car-add.component';

describe('RegisteredCarAddComponent', () => {
  let component: RegisteredCarAddComponent;
  let fixture: ComponentFixture<RegisteredCarAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredCarAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredCarAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
