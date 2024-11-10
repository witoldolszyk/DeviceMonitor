import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EquipmentService } from '../../shared/services/equipment.service';
import { Equipment } from '../../shared/models/equipment.model';
import { BehaviorSubject, combineLatest, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { StatusFilterComponent } from './status-filter/status-filter.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, EquipmentListComponent, StatusFilterComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DashboardComponent implements OnInit {
  private statusFilter$ = new BehaviorSubject<string>(''); 
  equipmentList$!: Observable<Equipment[]>; 
  filteredList$!: Observable<Equipment[]>; 
  errorMessage: string | null = null;

  constructor(private equipmentService: EquipmentService) {}

  ngOnInit(): void {
    this.equipmentList$ = this.equipmentService.getEquipmentData().pipe(
      catchError(error => {
        this.errorMessage = 'Failed to load equipment data. Please try again later.';
        console.error('Data fetching error:', error);
        return throwError(() => new Error(this.errorMessage || 'Unknown error'));
      })
    );

    this.filteredList$ = combineLatest([this.equipmentList$, this.statusFilter$]).pipe(
      map(([equipmentList, selectedStatus]) =>
        selectedStatus
          ? equipmentList.filter(item => item.status === selectedStatus)
          : equipmentList
      ),
      catchError(error => {
        this.errorMessage = 'An error occurred while applying filters.';
        console.error('Filtering error:', error);
        return throwError(() => new Error(this.errorMessage || 'Unknown error'));
      })
    );
  }

  onStatusChange(status: string): void {
    this.statusFilter$.next(status);
  }

  onEquipmentSelected(selectedEquipment: Equipment): void {
    console.log('Selected Equipment:', selectedEquipment);
  }
}
