import { TestBed, inject } from '@angular/core/testing';

import { PeopleManageService } from './people-manage.service';

describe('PeopleManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeopleManageService]
    });
  });

  it('should be created', inject([PeopleManageService], (service: PeopleManageService) => {
    expect(service).toBeTruthy();
  }));
});
