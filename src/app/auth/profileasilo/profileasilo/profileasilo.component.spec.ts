import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileasiloComponent } from './profileasilo.component';

describe('ProfileasiloComponent', () => {
  let component: ProfileasiloComponent;
  let fixture: ComponentFixture<ProfileasiloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileasiloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileasiloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
