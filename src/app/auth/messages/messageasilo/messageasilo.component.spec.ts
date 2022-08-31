import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageasiloComponent } from './messageasilo.component';

describe('MessageasiloComponent', () => {
  let component: MessageasiloComponent;
  let fixture: ComponentFixture<MessageasiloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageasiloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageasiloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
