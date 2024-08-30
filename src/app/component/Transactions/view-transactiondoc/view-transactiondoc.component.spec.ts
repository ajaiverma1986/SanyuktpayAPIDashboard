import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTransactiondocComponent } from './view-transactiondoc.component';

describe('ViewTransactiondocComponent', () => {
  let component: ViewTransactiondocComponent;
  let fixture: ComponentFixture<ViewTransactiondocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTransactiondocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewTransactiondocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
