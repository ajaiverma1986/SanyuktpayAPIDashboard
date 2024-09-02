import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsrStatementComponent } from './usr-statement.component';

describe('UsrStatementComponent', () => {
  let component: UsrStatementComponent;
  let fixture: ComponentFixture<UsrStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsrStatementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsrStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
