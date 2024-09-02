import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeDeductiontypeComponent } from './charge-deductiontype.component';

describe('ChargeDeductiontypeComponent', () => {
  let component: ChargeDeductiontypeComponent;
  let fixture: ComponentFixture<ChargeDeductiontypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargeDeductiontypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChargeDeductiontypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
