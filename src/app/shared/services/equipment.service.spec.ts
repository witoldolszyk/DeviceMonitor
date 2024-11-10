import { TestBed } from '@angular/core/testing';
import { EquipmentService } from './equipment.service';
import { of } from 'rxjs';
import { EQUIPMENT_DATA } from '../mocks/equipment.mock';

describe('EquipmentService', () => {
  let service: EquipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return equipment data', (done) => {
    service.getEquipmentData().subscribe((data) => {
      expect(data).toEqual(EQUIPMENT_DATA);
      expect(data.length).toBe(5);
      done();
    });
  });
});
