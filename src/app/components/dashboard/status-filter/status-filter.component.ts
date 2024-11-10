import { ChangeDetectionStrategy, Component,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-status-filter',
  standalone: true,
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusFilterComponent {
  @Output() statusChange = new EventEmitter<string>();
  
  // Handles status selection changes
  onStatusSelected(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.statusChange.emit(target.value);
  }
}
