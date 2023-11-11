import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendsProfileComponent } from './recommends-profile.component';

describe('RecommendsProfileComponent', () => {
  let component: RecommendsProfileComponent;
  let fixture: ComponentFixture<RecommendsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendsProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
