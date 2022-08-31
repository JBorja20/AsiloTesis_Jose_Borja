import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsilorechazadoComponent } from './asilorechazado.component';

describe('AsilorechazadoComponent', () => {
  let component: AsilorechazadoComponent;
  let fixture: ComponentFixture<AsilorechazadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsilorechazadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsilorechazadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
