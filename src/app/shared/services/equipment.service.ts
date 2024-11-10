import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { EQUIPMENT_DATA } from '../mocks/equipment.mock';
import { Equipment } from '../models/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor() { }

  getEquipmentData(): Observable<Equipment[]> {
    return of(EQUIPMENT_DATA).pipe(delay(500)); 
  }
}
