import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredCarViewComponent } from './registered-car-view.component';

describe('RegisteredCarViewComponent', () => {
  let component: RegisteredCarViewComponent;
  let fixture: ComponentFixture<RegisteredCarViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredCarViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredCarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
