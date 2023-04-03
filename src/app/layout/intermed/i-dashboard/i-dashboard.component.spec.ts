import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IDashboardComponent } from './i-dashboard.component';

describe('IDashboardComponent', () => {
  let component: IDashboardComponent;
  let fixture: ComponentFixture<IDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
