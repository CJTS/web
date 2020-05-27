import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { WebsocketService } from "./websocket.service";
import { map } from "rxjs/operators";

const SERVER_URL = "ws://localhost:8081";

export interface Message {
  type: string;
  value;
}

@Injectable({
  providedIn: 'root'
})
export class GridService {
  public messages: Subject<Message>;
  constructor(wsService: WebsocketService) {
    this.messages = <Subject<Message>>wsService.connect(SERVER_URL).pipe(map(
      (response: MessageEvent): Message => {
        let msg = response.data.split('|');
        return {
          type: msg[0],
          value: JSON.parse(msg[1])
        };
      }
    ));
  }
}
