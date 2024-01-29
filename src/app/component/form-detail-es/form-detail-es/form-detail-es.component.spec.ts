import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDetailEsComponent } from './form-detail-es.component';

describe('FormDetailEsComponent', () => {
  let component: FormDetailEsComponent;
  let fixture: ComponentFixture<FormDetailEsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDetailEsComponent]
    });
    fixture = TestBed.createComponent(FormDetailEsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
