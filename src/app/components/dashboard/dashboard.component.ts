import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EquipmentService } from '../../shared/services/equipment.service';
import { Equipment } from '../../shared/models/equipment.model';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  constructor(private equipmentService: EquipmentService) {}

  ngOnInit(): void {
    this.equipmentList$ = this.equipmentService.getEquipmentData();

    this.filteredList$ = combineLatest([this.equipmentList$, this.statusFilter$]).pipe(
      map(([equipmentList, selectedStatus]) =>
        selectedStatus
          ? equipmentList.filter(item => item.status === selectedStatus)
          : equipmentList
      )
    );
  }

  onStatusChange(status: string): void {
    this.statusFilter$.next(status);
  }

  onEquipmentSelected(selectedEquipment: Equipment): void {
    console.log('Selected Equipment:', selectedEquipment);
  }
}
