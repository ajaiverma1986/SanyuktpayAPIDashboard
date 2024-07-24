import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissiontypeComponent } from './commissiontype.component';

describe('CommissiontypeComponent', () => {
  let component: CommissiontypeComponent;
  let fixture: ComponentFixture<CommissiontypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommissiontypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommissiontypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
