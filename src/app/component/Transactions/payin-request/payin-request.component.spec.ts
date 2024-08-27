import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayinRequestComponent } from './payin-request.component';

describe('PayinRequestComponent', () => {
  let component: PayinRequestComponent;
  let fixture: ComponentFixture<PayinRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayinRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayinRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
