import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { DataProvider } from 'src/app/api/data-provider';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, filter, startWith } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-data-query',
  templateUrl: './data-query.component.html',
  styleUrls: ['./data-query.component.scss'],
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataQueryComponent implements OnInit {

  dataProvider = inject(DataProvider);

  query = new FormGroup({
    frequency: new FormControl(2000, [Validators.required, Validators.min(100)]),
    size: new FormControl(100, [Validators.required, Validators.min(10)]),
  });

  ngOnInit() {
    this.query.valueChanges.pipe(
      startWith(this.query.value),
      debounceTime(200),
      filter(() => this.query.valid),
    ).subscribe((query) => this.dataProvider.worker.postMessage(query))
  }

}
