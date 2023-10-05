import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteptstComponent } from './steptst.component';

describe('SteptstComponent', () => {
  let component: SteptstComponent;
  let fixture: ComponentFixture<SteptstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SteptstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SteptstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
