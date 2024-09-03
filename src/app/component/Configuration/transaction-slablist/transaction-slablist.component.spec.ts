import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionSlablistComponent } from './transaction-slablist.component';

describe('TransactionSlablistComponent', () => {
  let component: TransactionSlablistComponent;
  let fixture: ComponentFixture<TransactionSlablistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionSlablistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionSlablistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
