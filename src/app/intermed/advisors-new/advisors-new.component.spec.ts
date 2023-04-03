import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorsNewComponent } from './advisors-new.component';

describe('AdvisorsNewComponent', () => {
  let component: AdvisorsNewComponent;
  let fixture: ComponentFixture<AdvisorsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvisorsNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvisorsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
