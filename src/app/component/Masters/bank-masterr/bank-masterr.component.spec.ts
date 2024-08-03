import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankMasterrComponent } from './bank-masterr.component';

describe('BankMasterrComponent', () => {
  let component: BankMasterrComponent;
  let fixture: ComponentFixture<BankMasterrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankMasterrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankMasterrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
