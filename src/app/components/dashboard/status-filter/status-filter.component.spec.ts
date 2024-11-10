import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusFilterComponent } from './status-filter.component';

describe('StatusFilterComponent', () => {
  let component: StatusFilterComponent;
  let fixture: ComponentFixture<StatusFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusFilterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StatusFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit statusChange with selected value', () => {
    spyOn(component.statusChange, 'emit');
    const selectElement: HTMLSelectElement = fixture.nativeElement.querySelector('select');
    
    selectElement.value = 'Active';
    selectElement.dispatchEvent(new Event('change'));

    expect(component.statusChange.emit).toHaveBeenCalledWith('Active');
  });
});
