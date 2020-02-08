import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesCuartelesComponent } from './tables-cuarteles.component';

describe('TablesComponent', () => {
  let component: TablesCuartelesComponent;
  let fixture: ComponentFixture<TablesCuartelesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablesCuartelesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesCuartelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
