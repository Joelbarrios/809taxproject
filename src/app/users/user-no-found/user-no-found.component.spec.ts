import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNoFoundComponent } from './user-no-found.component';

describe('UserNoFoundComponent', () => {
  let component: UserNoFoundComponent;
  let fixture: ComponentFixture<UserNoFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserNoFoundComponent]
    });
    fixture = TestBed.createComponent(UserNoFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
