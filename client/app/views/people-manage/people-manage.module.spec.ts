import { PeopleManageModule } from './people-manage.module';

describe('PeopleManageModule', () => {
  let peopleManageModule: PeopleManageModule;

  beforeEach(() => {
    peopleManageModule = new PeopleManageModule();
  });

  it('should create an instance', () => {
    expect(peopleManageModule).toBeTruthy();
  });
});
