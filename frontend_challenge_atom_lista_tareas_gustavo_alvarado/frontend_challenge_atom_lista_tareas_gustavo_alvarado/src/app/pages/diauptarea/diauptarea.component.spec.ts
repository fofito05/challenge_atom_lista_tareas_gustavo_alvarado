import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiauptareaComponent } from './diauptarea.component';

describe('DiauptareaComponent', () => {
  let component: DiauptareaComponent;
  let fixture: ComponentFixture<DiauptareaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiauptareaComponent]
    });
    fixture = TestBed.createComponent(DiauptareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
