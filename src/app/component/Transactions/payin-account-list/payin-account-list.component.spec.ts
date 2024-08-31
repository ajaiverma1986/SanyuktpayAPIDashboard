import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayinAccountListComponent } from './payin-account-list.component';

describe('PayinAccountListComponent', () => {
  let component: PayinAccountListComponent;
  let fixture: ComponentFixture<PayinAccountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayinAccountListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayinAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
