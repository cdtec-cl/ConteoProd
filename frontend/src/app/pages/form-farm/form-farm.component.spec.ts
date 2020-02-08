import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFarmComponent } from './form-farm.component';

describe('TablesComponent', () => {
  let component: FormFarmComponent;
  let fixture: ComponentFixture<FormFarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
