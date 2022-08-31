import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleasiloComponent } from './moduleasilo.component';

describe('ModuleasiloComponent', () => {
  let component: ModuleasiloComponent;
  let fixture: ComponentFixture<ModuleasiloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleasiloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleasiloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
