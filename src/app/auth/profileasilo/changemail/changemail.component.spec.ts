import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangemailComponent } from './changemail.component';

describe('ChangemailComponent', () => {
  let component: ChangemailComponent;
  let fixture: ComponentFixture<ChangemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangemailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
