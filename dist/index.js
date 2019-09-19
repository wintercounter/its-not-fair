import "./style.scss";
import Main from "./Main";
import PacMan from "./players/PacMan";
import Monster from "./players/Monster";
import One from "./Maps/One";
import PlayerRandom from "./mixins/ais/PlayerRandom";
/* eslint-disable-next-line */

new Main({
  getMap() {
    return new One();
  },

  getPlayers(app, map) {
    return [new PacMan({
      app,
      map,
      control: true
    }), new Monster({
      app,
      map,
      mixins: [PlayerRandom]
    }), new Monster({
      app,
      map,
      mixins: [PlayerRandom]
    }), new Monster({
      app,
      map,
      mixins: [PlayerRandom]
    })];
  }

});