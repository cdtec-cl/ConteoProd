import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesFincaComponent } from './tables-finca.component';

describe('TablesComponent', () => {
  let component: TablesFincaComponent;
  let fixture: ComponentFixture<TablesFincaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablesFincaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesFincaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
