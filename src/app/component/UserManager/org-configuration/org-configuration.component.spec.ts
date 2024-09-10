import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgConfigurationComponent } from './org-configuration.component';

describe('OrgConfigurationComponent', () => {
  let component: OrgConfigurationComponent;
  let fixture: ComponentFixture<OrgConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgConfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrgConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
