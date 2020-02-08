import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCuartelComponent } from './form-cuartel.component';

describe('TablesComponent', () => {
  let component: FormCuartelComponent;
  let fixture: ComponentFixture<FormCuartelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCuartelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCuartelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
