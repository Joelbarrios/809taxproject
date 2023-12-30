import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSummitedComponent } from './form-summited.component';

describe('FormSummitedComponent', () => {
  let component: FormSummitedComponent;
  let fixture: ComponentFixture<FormSummitedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormSummitedComponent]
    });
    fixture = TestBed.createComponent(FormSummitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
