import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogrechazarComponent } from './dialogrechazar.component';

describe('DialogrechazarComponent', () => {
  let component: DialogrechazarComponent;
  let fixture: ComponentFixture<DialogrechazarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogrechazarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogrechazarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
