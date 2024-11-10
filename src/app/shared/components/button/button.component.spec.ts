import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<app-button [label]="'Click Me'"></app-button>`
})
class TestHostComponent {}

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent], // zamiast declarations użyjemy imports
      declarations: [TestHostComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    component = fixture.debugElement.query(By.directive(ButtonComponent)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the label', () => {
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.textContent.trim()).toBe('Click Me');
  });

  it('should apply the correct class', () => {
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.classList).toContain('py-2');
  });

  it('should call handleClick on button click', () => {
    spyOn(component, 'handleClick');
    const buttonElement = fixture.nativeElement.querySelector('button');
    buttonElement.click();
    expect(component.handleClick).toHaveBeenCalled();
  });
});
