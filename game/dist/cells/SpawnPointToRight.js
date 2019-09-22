function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import SpawnPoint from "./SpawnPoint";
import { RIGHT } from "../../../constants/Directions";
export default class SpawnPointToRight extends SpawnPoint {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "defaultDirection", RIGHT);
  }

}