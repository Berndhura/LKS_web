import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcatSelectComponent } from './subcat-select.component';

describe('SubcatSelectComponent', () => {
  let component: SubcatSelectComponent;
  let fixture: ComponentFixture<SubcatSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcatSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcatSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
