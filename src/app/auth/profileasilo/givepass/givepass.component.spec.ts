import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GivepassComponent } from './givepass.component';

describe('GivepassComponent', () => {
  let component: GivepassComponent;
  let fixture: ComponentFixture<GivepassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GivepassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GivepassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
