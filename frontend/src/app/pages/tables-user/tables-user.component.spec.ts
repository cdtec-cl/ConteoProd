import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesUserComponent } from './tables-user.component';

describe('TablesComponent', () => {
  let component: TablesUserComponent;
  let fixture: ComponentFixture<TablesUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablesUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
