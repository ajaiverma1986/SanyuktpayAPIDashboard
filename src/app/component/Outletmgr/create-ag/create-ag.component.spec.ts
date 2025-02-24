import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAGComponent } from './create-ag.component';

describe('CreateAGComponent', () => {
  let component: CreateAGComponent;
  let fixture: ComponentFixture<CreateAGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAGComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
