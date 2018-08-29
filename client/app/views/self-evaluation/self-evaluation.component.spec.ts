import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfEvaluationComponent } from './self-evaluation.component';

describe('SelfEvaluationComponent', () => {
  let component: SelfEvaluationComponent;
  let fixture: ComponentFixture<SelfEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
