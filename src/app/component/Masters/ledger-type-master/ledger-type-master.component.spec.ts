import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerTypeMasterComponent } from './ledger-type-master.component';

describe('LedgerTypeMasterComponent', () => {
  let component: LedgerTypeMasterComponent;
  let fixture: ComponentFixture<LedgerTypeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedgerTypeMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LedgerTypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
