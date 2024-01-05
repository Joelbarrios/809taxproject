import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedEsComponent } from './archived-es.component';

describe('ArchivedEsComponent', () => {
  let component: ArchivedEsComponent;
  let fixture: ComponentFixture<ArchivedEsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivedEsComponent]
    });
    fixture = TestBed.createComponent(ArchivedEsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
