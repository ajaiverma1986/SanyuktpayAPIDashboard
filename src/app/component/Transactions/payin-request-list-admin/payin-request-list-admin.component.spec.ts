import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayinRequestListAdminComponent } from './payin-request-list-admin.component';

describe('PayinRequestListAdminComponent', () => {
  let component: PayinRequestListAdminComponent;
  let fixture: ComponentFixture<PayinRequestListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayinRequestListAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayinRequestListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
