import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadAddUserComponent } from './lead-add-user.component';

describe('LeadAddUserComponent', () => {
  let component: LeadAddUserComponent;
  let fixture: ComponentFixture<LeadAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadAddUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeadAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
