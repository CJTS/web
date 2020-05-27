import { Component } from '@angular/core';
import { WebsocketService } from "./websocket.service";
import { GridService } from "./grid.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WebsocketService, GridService]

})
export class AppComponent {
  x = 0;
  y = 0;
  xArr = [];
  yArr = [];
  grid = [];

  constructor(private gridService: GridService) {
    console.log('Started')
    gridService.messages.subscribe(msg => {
      if (msg.type === 'gridsize') {
        this.x = msg.value.x;
        this.y = msg.value.y;
        this.xArr = Array(msg.value.x).fill(0).map((x, i) => i);
        this.yArr = Array(msg.value.y).fill(0).map((x, i) => i);
        this.grid = Array(msg.value.y * msg.value.y).fill(0);
      } else if (msg.type === 'grid') {
        this.grid.fill(0);
        msg.value.forEach(agent => {
          this.grid[(parseInt(agent.y) * this.x) + parseInt(agent.x)] = agent.id;
        });
      }
    });
  }
}
