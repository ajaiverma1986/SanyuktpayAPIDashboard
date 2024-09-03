import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransactionslabComponent } from './add-transactionslab.component';

describe('AddTransactionslabComponent', () => {
  let component: AddTransactionslabComponent;
  let fixture: ComponentFixture<AddTransactionslabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTransactionslabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTransactionslabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
