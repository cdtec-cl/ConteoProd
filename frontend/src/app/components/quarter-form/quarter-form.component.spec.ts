import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterFormComponent } from './quarter-form.component';

describe('QuarterFormComponent', () => {
  let component: QuarterFormComponent;
  let fixture: ComponentFixture<QuarterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuarterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
