import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemographicMasterComponent } from './demographic-master.component';

describe('DemographicMasterComponent', () => {
  let component: DemographicMasterComponent;
  let fixture: ComponentFixture<DemographicMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemographicMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemographicMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
