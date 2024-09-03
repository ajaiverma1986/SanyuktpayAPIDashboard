import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAccountListComponent } from './payment-account-list.component';

describe('PaymentAccountListComponent', () => {
  let component: PaymentAccountListComponent;
  let fixture: ComponentFixture<PaymentAccountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentAccountListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
