import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadUserComponent } from './lead-user.component';

describe('LeadUserComponent', () => {
  let component: LeadUserComponent;
  let fixture: ComponentFixture<LeadUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeadUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
