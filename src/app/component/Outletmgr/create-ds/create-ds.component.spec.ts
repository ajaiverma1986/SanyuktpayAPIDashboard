import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDSComponent } from './create-ds.component';

describe('CreateDSComponent', () => {
  let component: CreateDSComponent;
  let fixture: ComponentFixture<CreateDSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDSComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
