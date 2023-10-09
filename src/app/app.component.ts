import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataQueryComponent } from './ui/data-query/data-query.component';
import { DataTableComponent } from './ui/data-table/data-table.component';
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [DataQueryComponent, DataTableComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
