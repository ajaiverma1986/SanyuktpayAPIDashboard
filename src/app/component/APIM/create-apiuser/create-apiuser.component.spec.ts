import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAPIUserComponent } from './create-apiuser.component';

describe('CreateAPIUserComponent', () => {
  let component: CreateAPIUserComponent;
  let fixture: ComponentFixture<CreateAPIUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAPIUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAPIUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
