import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerTComponent } from './scanner-t.component';

describe('ScannerTComponent', () => {
  let component: ScannerTComponent;
  let fixture: ComponentFixture<ScannerTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScannerTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannerTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
