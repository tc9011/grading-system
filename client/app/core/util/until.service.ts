import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UntilService {

  constructor() { }

  public setProgress(data: any[]): number {
    let progress: number;
    const allPeople = data.length;
    let finished = 0;
    for (const item of data) {
      if (item.status) {
        finished++;
      }
    }

    progress = Math.round((finished / allPeople) * 100);
    progress = isNaN(progress) ? 0 : progress;
    return progress;
  }

  public statusFilter(status: string, target: Array<any>): Array<any> {
    let displayData = [];
    if (status === 'unfinished') {
      for (const item of target) {
        if (!item.status) {
          displayData.push(item);
        }
      }
    } else {
      displayData = target;
    }
    return displayData;
  }

  public formatDate(date: Date): string {
    const formatDate = new Date(date);
    const year = formatDate.getFullYear().toString();
    const month = (formatDate.getMonth() + 1).toString();
    return month + '-' + year;
  }
}
