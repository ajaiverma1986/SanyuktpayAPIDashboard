import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemdsComponent } from './createmds.component';

describe('CreatemdsComponent', () => {
  let component: CreatemdsComponent;
  let fixture: ComponentFixture<CreatemdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatemdsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatemdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
