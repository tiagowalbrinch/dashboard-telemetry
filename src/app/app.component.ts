import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TelemetryComponent } from './components/telemetry/telemetry.component';
import { ServerSentEventService } from '../services/server-sent-event/server-sent-event.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TelemetryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  physicsData: any;
  staticData: any;
  graphicsData: any;

  constructor(private acSSEService: ServerSentEventService) {}
  isLoading() {
    if (this.physicsData && this.staticData && this.graphicsData) {
      return false;
    } else return true;
  }

  ngOnInit() {
    this.acSSEService.onPhysicsChange((data) => {
      console.log(data.kersInput, "1")
      this.physicsData = {...data, kersInput: data.kersInput - 0.00001};
      console.log(this.physicsData.kersInput)
    });
    this.acSSEService.onStaticChange((data) => {
      console.log(data);
      this.staticData = data;
    });
    this.acSSEService.onGraphicsChange((data) => {
      this.graphicsData = data;
    });
  }

  getFields(object: any): any {
    return Object.keys(object);
  }
  getValues(object: any): any {
    return Object.values(object);
  }

  title = 'dashboard-telemetry';
}
