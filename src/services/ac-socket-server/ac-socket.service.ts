import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class AcSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:7788', {
      transports: ['websocket', 'polling'],
    });

    this.onConnect();
  }

  onConnect() {
    this.socket.on('connect', () => {
      console.log('Conexão estabelecida com o servidor Socket.io');
    });
  }

  onDisconnect() {
    this.socket.on('disconnect', () => {
      console.log('Desconectado do servidor Socket.io');
    });
  }
  onMessage(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on('atualizacao', (data: any) => {
        const uint8Array = new Uint8Array(data);
        const text = new TextDecoder('utf-8').decode(uint8Array);
        const jsonObject = JSON.parse(text);
        observer.next(jsonObject);
      });
    });
  }
}
