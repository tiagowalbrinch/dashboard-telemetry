import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelemetryComponent } from './telemetry.component';

describe('TelemetryComponent', () => {
  let component: TelemetryComponent;
  let fixture: ComponentFixture<TelemetryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelemetryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelemetryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
