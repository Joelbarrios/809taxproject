import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form2023esComponent } from './form2023es.component';

describe('Form2023esComponent', () => {
  let component: Form2023esComponent;
  let fixture: ComponentFixture<Form2023esComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Form2023esComponent]
    });
    fixture = TestBed.createComponent(Form2023esComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
