import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MutualEvaluationComponent } from './mutual-evaluation.component';

describe('MutualEvaluationComponent', () => {
  let component: MutualEvaluationComponent;
  let fixture: ComponentFixture<MutualEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MutualEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MutualEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
