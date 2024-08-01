import { Component, Input, OnInit } from '@angular/core';

import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-telemetry',
  standalone: true,
  imports: [AppComponent, CommonModule],
  templateUrl: './telemetry.component.html',
  styleUrl: './telemetry.component.scss',
})
export class TelemetryComponent {
  @Input() field: string = '';
  @Input() value: any = '';

  isArray(value: any): boolean {
    return Array.isArray(value);
  }
  isNumber(value: any): boolean {
    return typeof value === 'number';
  }
  parseFloat(string: string) {
    return parseFloat(string);
  }
}
