import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanmasterComponent } from './planmaster.component';

describe('PlanmasterComponent', () => {
  let component: PlanmasterComponent;
  let fixture: ComponentFixture<PlanmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanmasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
