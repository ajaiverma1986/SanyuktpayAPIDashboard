import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceConnectComponent } from './device-connect.component';

describe('DeviceConnectComponent', () => {
  let component: DeviceConnectComponent;
  let fixture: ComponentFixture<DeviceConnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceConnectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
