import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PannedUsersComponent } from './panned-users.component';

describe('PannedUsersComponent', () => {
  let component: PannedUsersComponent;
  let fixture: ComponentFixture<PannedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PannedUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PannedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
