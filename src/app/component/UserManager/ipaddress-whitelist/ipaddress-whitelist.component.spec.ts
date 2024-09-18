import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IPAddressWhitelistComponent } from './ipaddress-whitelist.component';

describe('IPAddressWhitelistComponent', () => {
  let component: IPAddressWhitelistComponent;
  let fixture: ComponentFixture<IPAddressWhitelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IPAddressWhitelistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IPAddressWhitelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
