import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayinAccountComponent } from './payin-account.component';

describe('PayinAccountComponent', () => {
  let component: PayinAccountComponent;
  let fixture: ComponentFixture<PayinAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayinAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayinAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
