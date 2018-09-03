import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MutualSummaryComponent } from './mutual-summary.component';

describe('MutualSummaryComponent', () => {
  let component: MutualSummaryComponent;
  let fixture: ComponentFixture<MutualSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MutualSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MutualSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
