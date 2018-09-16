import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAgencyComponent } from './template-agency.component';

describe('TemplateAgencyComponent', () => {
  let component: TemplateAgencyComponent;
  let fixture: ComponentFixture<TemplateAgencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateAgencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
