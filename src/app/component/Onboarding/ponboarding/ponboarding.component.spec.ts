import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PonboardingComponent } from './ponboarding.component';

describe('PonboardingComponent', () => {
  let component: PonboardingComponent;
  let fixture: ComponentFixture<PonboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PonboardingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PonboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
