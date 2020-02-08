import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesSeasonComponent } from './tables-season.component';

describe('TableSeasonComponent', () => {
  let component: TablesSeasonComponent;
  let fixture: ComponentFixture<TablesSeasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablesSeasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
