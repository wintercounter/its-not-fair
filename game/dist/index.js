function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as PIXI from 'pixi.js';
export default class Game {
  constructor({
    getMap,
    getPlayers,
    container: _container
  }) {
    _defineProperty(this, "app", new PIXI.Application({
      width: 704,
      height: 704,
      antialias: true,
      transparent: false,
      resolution: 1
    }));

    _defineProperty(this, "players", void 0);

    _defineProperty(this, "map", void 0);

    _defineProperty(this, "getPlayers", void 0);

    _defineProperty(this, "getMap", void 0);

    _defineProperty(this, "container", void 0);

    _defineProperty(this, "setup", () => {
      this.map = this.getMap(this.app);
      this.players = this.getPlayers(this.app, this.map);
      this.app.renderer.backgroundColor = 0x000000;
      this.app.stage.addChild(this.map.baseLayer);
      this.app.stage.addChild(this.map.graphicsLayer);
      this.app.stage.addChild(this.map.animationLayer);
      this.players.forEach(({
        container
      }) => this.app.stage.addChild(container));
      this.container.appendChild(this.app.view);
      this.start();
    });

    _defineProperty(this, "loop", () => {
      this.players.forEach(player => player.draw());
      this.map.draw();
    });

    this.getPlayers = getPlayers;
    this.getMap = getMap;
    this.container = _container;
    this.load();
  }

  load() {
    this.app.loader //.add(SpritePacMan)
    .add('monster', 'monster.json').load(this.setup);
  }

  start() {
    this.app.ticker.add(this.loop);
  }

}