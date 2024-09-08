import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayinAccountListAdminComponent } from './payin-account-list-admin.component';

describe('PayinAccountListAdminComponent', () => {
  let component: PayinAccountListAdminComponent;
  let fixture: ComponentFixture<PayinAccountListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayinAccountListAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayinAccountListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
