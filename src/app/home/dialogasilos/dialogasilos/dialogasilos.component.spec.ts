import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogasilosComponent } from './dialogasilos.component';

describe('DialogasilosComponent', () => {
  let component: DialogasilosComponent;
  let fixture: ComponentFixture<DialogasilosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogasilosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogasilosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
