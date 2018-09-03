import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfSummaryComponent } from './self-summary.component';

describe('SelfSummaryComponent', () => {
  let component: SelfSummaryComponent;
  let fixture: ComponentFixture<SelfSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
