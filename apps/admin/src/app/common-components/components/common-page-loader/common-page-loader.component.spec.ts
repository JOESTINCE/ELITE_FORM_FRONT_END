import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonPageLoaderComponent } from './common-page-loader.component';

describe('CommonPageLoaderComponent', () => {
  let component: CommonPageLoaderComponent;
  let fixture: ComponentFixture<CommonPageLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonPageLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonPageLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
