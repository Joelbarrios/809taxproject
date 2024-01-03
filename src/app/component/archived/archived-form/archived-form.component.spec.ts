import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedFormComponent } from './archived-form.component';

describe('ArchivedFormComponent', () => {
  let component: ArchivedFormComponent;
  let fixture: ComponentFixture<ArchivedFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivedFormComponent]
    });
    fixture = TestBed.createComponent(ArchivedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
