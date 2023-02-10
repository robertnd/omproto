import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsNewComponent } from './leads-new.component';

describe('LeadsNewComponent', () => {
  let component: LeadsNewComponent;
  let fixture: ComponentFixture<LeadsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadsNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
