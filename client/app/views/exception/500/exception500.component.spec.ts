import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Exception500Component } from './exception500.component';

describe('Exception500Component', () => {
  let component: Exception500Component;
  let fixture: ComponentFixture<Exception500Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Exception500Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Exception500Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
