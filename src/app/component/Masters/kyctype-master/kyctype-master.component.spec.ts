import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KYCTypeMasterComponent } from './kyctype-master.component';

describe('KYCTypeMasterComponent', () => {
  let component: KYCTypeMasterComponent;
  let fixture: ComponentFixture<KYCTypeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KYCTypeMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KYCTypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
