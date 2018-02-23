import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreInfoWindowComponent } from './store-info-window.component';

describe('StoreInfoWindowComponent', () => {
  let component: StoreInfoWindowComponent;
  let fixture: ComponentFixture<StoreInfoWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreInfoWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreInfoWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
