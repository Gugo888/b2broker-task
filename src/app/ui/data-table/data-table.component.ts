import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, debounceTime, map, startWith } from 'rxjs';
import { DataItem } from 'src/app/api/data-factory';
import { DataProvider } from 'src/app/api/data-provider';

@Component({
  standalone: true,
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent {
  dataProvider = inject(DataProvider);
  additionalIDs = new FormControl('', { nonNullable: true });

  items$ = combineLatest([
    this.additionalIDs.valueChanges.pipe(
      startWith(this.additionalIDs.value),
      debounceTime(200),
      map((string) => string.split(',').map((id) => id.trim()))
    ),
    this.dataProvider.stream$,
  ]).pipe(
    map(([ids, items]) => {
      const initialItems = items.slice(0, 10);
      const additionalItems = items
        .slice(10)
        .filter((item) => ids.includes(item.id));

      return additionalItems.concat(initialItems);
    })
  );

  byID(index: number, item: DataItem) {
    return item.id;
  }
}
