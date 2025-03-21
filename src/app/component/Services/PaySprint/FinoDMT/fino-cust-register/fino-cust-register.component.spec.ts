import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinoCustRegisterComponent } from './fino-cust-register.component';

describe('FinoCustRegisterComponent', () => {
  let component: FinoCustRegisterComponent;
  let fixture: ComponentFixture<FinoCustRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinoCustRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinoCustRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
