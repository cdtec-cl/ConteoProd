import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountsPerBatchComponent } from './counts-per-batch.component';

describe('CountsPerBatchComponent', () => {
  let component: CountsPerBatchComponent;
  let fixture: ComponentFixture<CountsPerBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountsPerBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountsPerBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
