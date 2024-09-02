import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionCommissionComponent } from './distribution-commission.component';

describe('DistributionCommissionComponent', () => {
  let component: DistributionCommissionComponent;
  let fixture: ComponentFixture<DistributionCommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributionCommissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistributionCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
