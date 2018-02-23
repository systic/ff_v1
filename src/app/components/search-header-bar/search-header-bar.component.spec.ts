import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHeaderBarComponent } from './search-header-bar.component';

describe('SearchHeaderBarComponent', () => {
  let component: SearchHeaderBarComponent;
  let fixture: ComponentFixture<SearchHeaderBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchHeaderBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHeaderBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
