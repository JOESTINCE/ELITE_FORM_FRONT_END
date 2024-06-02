import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFormsComponent } from './add-edit-forms.component';

describe('AddEditFormsComponent', () => {
  let component: AddEditFormsComponent;
  let fixture: ComponentFixture<AddEditFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
