import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentListComponent } from './equipment-list.component';
import { Equipment } from '../../../shared/models/equipment.model';

describe('EquipmentListComponent', () => {
  let component: EquipmentListComponent;
  let fixture: ComponentFixture<EquipmentListComponent>;

  const mockEquipmentList: Equipment[] = [
    { id: 1, name: 'Generator', status: 'Active' },
    { id: 2, name: 'Compressor', status: 'Inactive' },
    { id: 3, name: 'Excavator', status: 'Active' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EquipmentListComponent);
    component = fixture.componentInstance;
    component.equipment = mockEquipmentList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit equipmentSelected with selected equipment', () => {
    spyOn(component.equipmentSelected, 'emit');
    const selectedEquipment = mockEquipmentList[0];
    
    component.selectEquipment(selectedEquipment);
    
    expect(component.equipmentSelected.emit).toHaveBeenCalledWith(selectedEquipment);
  });
});
