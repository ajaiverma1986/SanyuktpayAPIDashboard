import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinoMoneyDMTComponent } from './fino-money-dmt.component';

describe('FinoMoneyDMTComponent', () => {
  let component: FinoMoneyDMTComponent;
  let fixture: ComponentFixture<FinoMoneyDMTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinoMoneyDMTComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinoMoneyDMTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
