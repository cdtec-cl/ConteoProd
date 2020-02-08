import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSeasonComponent } from './form-season.component';

describe('FormSeasonComponent', () => {
  let component: FormSeasonComponent;
  let fixture: ComponentFixture<FormSeasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSeasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
