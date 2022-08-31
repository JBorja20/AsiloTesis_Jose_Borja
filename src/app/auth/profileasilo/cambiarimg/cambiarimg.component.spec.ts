import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarimgComponent } from './cambiarimg.component';

describe('CambiarimgComponent', () => {
  let component: CambiarimgComponent;
  let fixture: ComponentFixture<CambiarimgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarimgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
