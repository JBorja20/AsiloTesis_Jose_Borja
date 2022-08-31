import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllsilosComponent } from './allsilos.component';

describe('AllsilosComponent', () => {
  let component: AllsilosComponent;
  let fixture: ComponentFixture<AllsilosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllsilosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllsilosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
