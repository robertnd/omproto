import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampooComponent } from './sampoo.component';

describe('SampooComponent', () => {
  let component: SampooComponent;
  let fixture: ComponentFixture<SampooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampooComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
