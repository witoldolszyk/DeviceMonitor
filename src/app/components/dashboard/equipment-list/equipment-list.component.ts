import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { Equipment } from '../../../shared/models/equipment.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-equipment-list',
  standalone: true,
  imports: [NgClass],
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentListComponent {
  @Input() equipment: Equipment[] | null = []; 
  @Output() equipmentSelected = new EventEmitter<Equipment>(); 

  // Emits the selected equipment item
  selectEquipment(equipment: Equipment) {
    this.equipmentSelected.emit(equipment);
  }
}
