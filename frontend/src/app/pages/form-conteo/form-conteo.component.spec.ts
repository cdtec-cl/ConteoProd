import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConteoComponent } from './form-conteo.component';

describe('TablesComponent', () => {
  let component: FormConteoComponent;
  let fixture: ComponentFixture<FormConteoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormConteoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormConteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
