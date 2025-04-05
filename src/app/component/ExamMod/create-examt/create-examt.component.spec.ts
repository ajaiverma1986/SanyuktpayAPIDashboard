import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExamtComponent } from './create-examt.component';

describe('CreateExamtComponent', () => {
  let component: CreateExamtComponent;
  let fixture: ComponentFixture<CreateExamtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateExamtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateExamtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
