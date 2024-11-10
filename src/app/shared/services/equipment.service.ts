import { Injectable } from '@angular/core';
import { catchError, delay, Observable, of, throwError } from 'rxjs';
import { EQUIPMENT_DATA } from '../mocks/equipment.mock';
import { Equipment } from '../models/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor() { }
  
  // Retrieves equipment data with a simulated delay

  getEquipmentData(): Observable<Equipment[]> {
    return of(EQUIPMENT_DATA).pipe(
      delay(500),
      catchError(error => {
        console.error('Error fetching equipment data:', error);
        return throwError(() => new Error('Could not fetch equipment data.'));
      })
    );
  }
}
