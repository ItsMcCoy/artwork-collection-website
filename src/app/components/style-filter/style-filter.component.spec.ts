import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleFilterComponent } from './style-filter.component';

describe('StyleFilterComponent', () => {
  let component: StyleFilterComponent;
  let fixture: ComponentFixture<StyleFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StyleFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StyleFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
