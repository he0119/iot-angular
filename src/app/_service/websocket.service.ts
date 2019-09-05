import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { DeviceData } from '../shared/documentation-items';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: SocketIOClient.Socket;

  constructor(
    private authorizationService: AuthorizationService,
  ) { }

  // Message to server
  send(type: string, msg: any) {
    this.socket.emit('website', {
      type,
      data: msg
    });
  }

  // HANDLER
  onNewStatus() {
    const observable = new Observable(observer => {
      this.socket = io({
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: `Bearer ${this.authorizationService.getAccessToken()}`
            }
          }
        }
      });
      this.socket.on('status', (data: DeviceData) => {
        observer.next(data);
      });
      this.socket.on('connect_error', () => {
        this.authorizationService.refresh().subscribe(() => {
          document.location.reload();
        });
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
