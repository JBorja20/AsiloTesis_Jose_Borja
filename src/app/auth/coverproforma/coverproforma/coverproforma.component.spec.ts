import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverproformaComponent } from './coverproforma.component';

describe('CoverproformaComponent', () => {
  let component: CoverproformaComponent;
  let fixture: ComponentFixture<CoverproformaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverproformaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverproformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
