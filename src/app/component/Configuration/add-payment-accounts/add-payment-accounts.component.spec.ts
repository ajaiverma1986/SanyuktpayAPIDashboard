import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymentAccountsComponent } from './add-payment-accounts.component';

describe('AddPaymentAccountsComponent', () => {
  let component: AddPaymentAccountsComponent;
  let fixture: ComponentFixture<AddPaymentAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPaymentAccountsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPaymentAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
