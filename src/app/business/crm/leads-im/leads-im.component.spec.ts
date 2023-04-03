import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsImComponent } from './leads-im.component';

describe('LeadsImComponent', () => {
  let component: LeadsImComponent;
  let fixture: ComponentFixture<LeadsImComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadsImComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadsImComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
