import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Exception404Component } from './exception404.component';

describe('Exception404Component', () => {
  let component: Exception404Component;
  let fixture: ComponentFixture<Exception404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Exception404Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Exception404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
