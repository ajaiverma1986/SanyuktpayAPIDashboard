import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserKYCComponent } from './user-kyc.component';

describe('UserKYCComponent', () => {
  let component: UserKYCComponent;
  let fixture: ComponentFixture<UserKYCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserKYCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserKYCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
