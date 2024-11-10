import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EquipmentService } from '../../shared/services/equipment.service';
import { Equipment } from '../../shared/models/equipment.model';
import { BehaviorSubject, combineLatest, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { StatusFilterComponent } from './status-filter/status-filter.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    EquipmentListComponent, 
    StatusFilterComponent, 
    HeaderComponent, 
    FooterComponent
  ],
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
    // Fetches equipment data and handles potential errors
    this.equipmentList$ = this.equipmentService.getEquipmentData().pipe(
      catchError(error => {
        this.errorMessage = 'Failed to load equipment data. Please try again later.';
        console.error('Data fetching error:', error);
        return throwError(() => new Error(this.errorMessage || 'Unknown error'));
      })
    );

    // Applies status filter to equipment list and manages errors in filtering
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

  // Updates filter value based on user input
  onStatusChange(status: string): void {
    this.statusFilter$.next(status);
  }

  // Logs the selected equipment item when a user clicks or selects an equipment entry.
  onEquipmentSelected(selectedEquipment: Equipment): void {
    console.log('Selected Equipment:', selectedEquipment);
  }
}
