import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form2023enComponent } from './form2023en.component';

describe('Form2023enComponent', () => {
  let component: Form2023enComponent;
  let fixture: ComponentFixture<Form2023enComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Form2023enComponent]
    });
    fixture = TestBed.createComponent(Form2023enComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
