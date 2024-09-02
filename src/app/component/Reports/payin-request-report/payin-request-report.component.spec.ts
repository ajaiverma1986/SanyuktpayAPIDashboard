import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayinRequestReportComponent } from './payin-request-report.component';

describe('PayinRequestReportComponent', () => {
  let component: PayinRequestReportComponent;
  let fixture: ComponentFixture<PayinRequestReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayinRequestReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayinRequestReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
