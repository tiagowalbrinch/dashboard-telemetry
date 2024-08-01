import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServerSentEventService {
  private baseUrl = 'http://localhost:7788';
  private onPhysicsDataCallback: (data: any) => void = () => {};
  private onGraphicsDataCallback: (data: any) => void = () => {};
  private onStaticDataCallback: (data: any) => void = () => {};
  physicsEvent!: EventSource;
  staticEvent!: EventSource;
  graphicsEvent!: EventSource;

  constructor() {
    this.onInitPhysics();
    this.onInitGraphics();
    this.onInitStatic();
  }

  onInitPhysics() {
    this.physicsEvent = new EventSource(`${this.baseUrl}/physics-info`);
    this.physicsEvent.addEventListener('message', (event) => {
      const jsonObject = JSON.parse(event.data);
      this.notifyData(jsonObject, 'physics');
    });

    this.physicsEvent.onerror = (error) => {
      console.error('Physics event failed:', error);
    };
  }
  onInitGraphics() {
    this.graphicsEvent = new EventSource(`${this.baseUrl}/graphics-info`);
    this.graphicsEvent.addEventListener('message', (event) => {
      const jsonObject = JSON.parse(event.data);
      this.notifyData(jsonObject, 'graphics');
    });

    this.graphicsEvent.onerror = (error) => {
      console.error('Graphics event failed:', error);
    };
  }
  onInitStatic() {
    this.staticEvent = new EventSource(`${this.baseUrl}/static-info`);
    this.staticEvent.addEventListener('message', (event) => {
      const jsonObject = JSON.parse(event.data);
      this.notifyData(jsonObject, 'static');
      this.closeEventSource(this.staticEvent);
    });

    this.staticEvent.onerror = (error) => {
      console.error('Static event failed:', error);
    };
  }

  onPhysicsChange(callback: (data: any) => void): void {
    this.onPhysicsDataCallback = callback;
  }
  onGraphicsChange(callback: (data: any) => void): void {
    this.onGraphicsDataCallback = callback;
  }
  onStaticChange(callback: (data: any) => void): void {
    this.onStaticDataCallback = callback;
  }

  private notifyData(data: string, event: string): void {
    switch (event) {
      case 'physics':
        if (this.onPhysicsDataCallback) {
          this.onPhysicsDataCallback(data);
        }
        break;
      case 'static':
        if (this.onStaticDataCallback) {
          this.onStaticDataCallback(data);
        }
        break;
      case 'graphics':
        if (this.onGraphicsDataCallback) {
          this.onGraphicsDataCallback(data);
        }
        break;
      default:
        // Optionally handle an unknown event or throw an error
        console.error(`Unknown event type: ${event}`);
        break;
    }
  }

  closeEventSource(eventSource: EventSource): void {
    if (eventSource) {
      eventSource.close();
    }
  }
}
