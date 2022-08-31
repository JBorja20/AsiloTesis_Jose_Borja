import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazadosComponent } from './rechazados.component';

describe('RechazadosComponent', () => {
  let component: RechazadosComponent;
  let fixture: ComponentFixture<RechazadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechazadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechazadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
