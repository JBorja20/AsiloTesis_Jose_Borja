import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvidopassComponent } from './olvidopass.component';

describe('OlvidopassComponent', () => {
  let component: OlvidopassComponent;
  let fixture: ComponentFixture<OlvidopassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlvidopassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlvidopassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
