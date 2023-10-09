/// <reference lib="webworker" />

import { createDataItems } from "./data-factory";
import { Subscription, interval, startWith } from 'rxjs';

let intervalRef: Subscription;

addEventListener('message', ({ data }) => {
  const { frequency, size } = data;
  intervalRef?.unsubscribe();

  
  intervalRef = interval(frequency).pipe(startWith(null)).subscribe(() => {
    postMessage(createDataItems(size));
  })
});
