import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSpanishComponent } from './table-spanish.component';

describe('TableSpanishComponent', () => {
  let component: TableSpanishComponent;
  let fixture: ComponentFixture<TableSpanishComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableSpanishComponent]
    });
    fixture = TestBed.createComponent(TableSpanishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
