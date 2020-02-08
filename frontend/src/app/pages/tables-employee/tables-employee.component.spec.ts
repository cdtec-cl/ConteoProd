import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesEmployeeComponent } from './tables-employee.component';

describe('TablesComponent', () => {
  let component: TablesEmployeeComponent;
  let fixture: ComponentFixture<TablesEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablesEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
