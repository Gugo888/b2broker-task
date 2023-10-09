import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataItem } from './data-factory';

@Injectable({
  providedIn: 'root'
})
export class DataProvider {

  worker = new Worker(new URL('./data.worker', import.meta.url));
  stream$ = new Subject<DataItem[]>();

  constructor() {
    this.worker.onmessage = ({ data }) => {
      this.stream$.next(data);
    };
  }
}