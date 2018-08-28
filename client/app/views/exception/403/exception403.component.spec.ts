import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Exception403Component } from './exception403.component';

describe('Exception403Component', () => {
  let component: Exception403Component;
  let fixture: ComponentFixture<Exception403Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Exception403Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Exception403Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
