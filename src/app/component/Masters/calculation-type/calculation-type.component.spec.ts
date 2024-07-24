import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationTypeComponent } from './calculation-type.component';

describe('CalculationTypeComponent', () => {
  let component: CalculationTypeComponent;
  let fixture: ComponentFixture<CalculationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculationTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalculationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
