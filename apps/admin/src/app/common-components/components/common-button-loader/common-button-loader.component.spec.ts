import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonButtonLoaderComponent } from './common-button-loader.component';

describe('CommonButtonLoaderComponent', () => {
  let component: CommonButtonLoaderComponent;
  let fixture: ComponentFixture<CommonButtonLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonButtonLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonButtonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
