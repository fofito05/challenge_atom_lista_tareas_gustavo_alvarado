import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogtareaComponent } from './dialogtarea.component';

describe('DialogtareaComponent', () => {
  let component: DialogtareaComponent;
  let fixture: ComponentFixture<DialogtareaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogtareaComponent]
    });
    fixture = TestBed.createComponent(DialogtareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
