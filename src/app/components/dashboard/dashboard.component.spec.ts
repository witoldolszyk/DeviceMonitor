import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { EquipmentService } from '../../shared/services/equipment.service';
import { of } from 'rxjs';
import { Equipment } from '../../shared/models/equipment.model';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let equipmentServiceSpy: jasmine.SpyObj<EquipmentService>;

  const mockEquipmentList: Equipment[] = [
    { id: 1, name: 'Generator', status: 'Active' },
    { id: 2, name: 'Compressor', status: 'Inactive' },
    { id: 3, name: 'Excavator', status: 'Active' },
  ];

  beforeEach(async () => {
    equipmentServiceSpy = jasmine.createSpyObj('EquipmentService', ['getEquipmentData']);
    equipmentServiceSpy.getEquipmentData.and.returnValue(of(mockEquipmentList));

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [{ provide: EquipmentService, useValue: equipmentServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize equipmentList$ with data from the service', (done) => {
    component.equipmentList$.subscribe((data) => {
      expect(data).toEqual(mockEquipmentList);
      done();
    });
  });

  it('should filter equipment based on status', (done) => {
    component.onStatusChange('Active');
    component.filteredList$.subscribe((filteredData) => {
      expect(filteredData).toEqual([
        { id: 1, name: 'Generator', status: 'Active' },
        { id: 3, name: 'Excavator', status: 'Active' },
      ]);
      done();
    });
  });

  it('should handle equipment selection', () => {
    spyOn(console, 'log');
    const selectedEquipment: Equipment = { id: 1, name: 'Generator', status: 'Active' };
    component.onEquipmentSelected(selectedEquipment);
    expect(console.log).toHaveBeenCalledWith('Selected Equipment:', selectedEquipment);
  });
});
