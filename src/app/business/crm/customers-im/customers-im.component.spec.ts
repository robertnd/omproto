import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersImComponent } from './customers-im.component';

describe('CustomersImComponent', () => {
  let component: CustomersImComponent;
  let fixture: ComponentFixture<CustomersImComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersImComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersImComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
