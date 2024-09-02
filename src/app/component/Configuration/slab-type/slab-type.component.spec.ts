import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlabTypeComponent } from './slab-type.component';

describe('SlabTypeComponent', () => {
  let component: SlabTypeComponent;
  let fixture: ComponentFixture<SlabTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlabTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlabTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
