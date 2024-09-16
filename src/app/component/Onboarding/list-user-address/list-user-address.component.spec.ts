import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserAddressComponent } from './list-user-address.component';

describe('ListUserAddressComponent', () => {
  let component: ListUserAddressComponent;
  let fixture: ComponentFixture<ListUserAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUserAddressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListUserAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
