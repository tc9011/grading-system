import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleManageComponent } from './people-manage.component';

describe('PeopleManageComponent', () => {
  let component: PeopleManageComponent;
  let fixture: ComponentFixture<PeopleManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
