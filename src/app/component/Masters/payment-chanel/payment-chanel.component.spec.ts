import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentChanelComponent } from './payment-chanel.component';

describe('PaymentChanelComponent', () => {
  let component: PaymentChanelComponent;
  let fixture: ComponentFixture<PaymentChanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentChanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentChanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
