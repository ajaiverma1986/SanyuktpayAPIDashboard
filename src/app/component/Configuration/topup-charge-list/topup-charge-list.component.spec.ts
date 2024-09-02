import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopupChargeListComponent } from './topup-charge-list.component';

describe('TopupChargeListComponent', () => {
  let component: TopupChargeListComponent;
  let fixture: ComponentFixture<TopupChargeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopupChargeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopupChargeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
