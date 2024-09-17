import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IPManagerComponent } from './ipmanager.component';

describe('IPManagerComponent', () => {
  let component: IPManagerComponent;
  let fixture: ComponentFixture<IPManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IPManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IPManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
