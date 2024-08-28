import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayinRequestListComponent } from './payin-request-list.component';

describe('PayinRequestListComponent', () => {
  let component: PayinRequestListComponent;
  let fixture: ComponentFixture<PayinRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayinRequestListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayinRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
