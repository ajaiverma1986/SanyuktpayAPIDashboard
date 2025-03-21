import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresstypeComponent } from './addresstype.component';

describe('AddresstypeComponent', () => {
  let component: AddresstypeComponent;
  let fixture: ComponentFixture<AddresstypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddresstypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddresstypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
