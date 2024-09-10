import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgKycCheckerComponent } from './org-kyc-checker.component';

describe('OrgKycCheckerComponent', () => {
  let component: OrgKycCheckerComponent;
  let fixture: ComponentFixture<OrgKycCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgKycCheckerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrgKycCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
