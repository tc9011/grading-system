import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'peopleManage'
})
export class PeopleManagePipe implements PipeTransform {

  transform(value: number, args?: any): string {
    return value < 10 ? '普通用户' : '管理员';
  }

}
