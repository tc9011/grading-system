import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndEditComponent } from './add-and-edit.component';

describe('AddAndEditComponent', () => {
  let component: AddAndEditComponent;
  let fixture: ComponentFixture<AddAndEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAndEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
