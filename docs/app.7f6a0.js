/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Main.ts":
/*!*********************!*\
  !*** ./src/Main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Main)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");

class Main {
    load() {
        this.app.loader//.add(SpritePacMan)
        .add('monster', 'monster.json').load(this.setup);
    }
    start() {
        this.app.ticker.add(this.loop);
    }
    constructor({ getMap , getPlayers  }){
        this.app = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Application({
            width: 704,
            height: 704,
            antialias: true,
            transparent: false,
            resolution: 1
        });
        this.setup = ()=>{
            this.map = this.getMap(this.app);
            this.players = this.getPlayers(this.app, this.map);
            this.app.renderer.backgroundColor = 0x000000;
            this.app.stage.addChild(this.map.baseLayer);
            this.app.stage.addChild(this.map.graphicsLayer);
            this.app.stage.addChild(this.map.animationLayer);
            this.players.forEach(({ container  })=>this.app.stage.addChild(container));
            document.body.appendChild(this.app.view);
            this.start();
        };
        this.loop = ()=>{
            this.players.forEach((player)=>player.draw());
            this.map.draw();
        };
        this.getPlayers = getPlayers;
        this.getMap = getMap;
        this.load();
    }
}



/***/ }),

/***/ "./src/cells/Cell.ts":
/*!***************************!*\
  !*** ./src/cells/Cell.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cell)
/* harmony export */ });
class Cell {
    // eslint-disable-next-line
    draw() {}
    // eslint-disable-next-line
    containsPoint(x, y) {
        return false;
    }
    // eslint-disable-next-line
    destroy() {}
    constructor({ map , x , y , row , cell  }){
        this.walkThrough = false;
        this.map = map;
        this.x = x;
        this.y = y;
        this.row = row;
        this.cell = cell;
    }
}



/***/ }),

/***/ "./src/cells/SimpleSpace.ts":
/*!**********************************!*\
  !*** ./src/cells/SimpleSpace.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SimpleSpace)
/* harmony export */ });
/* harmony import */ var _Cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cell */ "./src/cells/Cell.ts");

class SimpleSpace extends _Cell__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(...args){
        super(...args);
        this.walkThrough = true;
    }
}



/***/ }),

/***/ "./src/cells/SpawnPoint.ts":
/*!*********************************!*\
  !*** ./src/cells/SpawnPoint.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SpawnPoint)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");
/* harmony import */ var _constants_Sizes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/constants/Sizes */ "./src/constants/Sizes.ts");
/* harmony import */ var _cells_SimpleSpace__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/cells/SimpleSpace */ "./src/cells/SimpleSpace.ts");



class SpawnPoint extends _cells_SimpleSpace__WEBPACK_IMPORTED_MODULE_2__["default"] {
    hasPlayer() {
        this.isOccupied = true;
        this.update();
    }
    update() {
        this.graphics.clear();
        this.graphics.beginFill(0xffffff);
        this.graphics.drawRect(this.x, this.y, _constants_Sizes__WEBPACK_IMPORTED_MODULE_1__.CELL_SIZE, _constants_Sizes__WEBPACK_IMPORTED_MODULE_1__.CELL_SIZE);
        this.graphics.endFill();
    }
    destroy() {
        this.graphics.destroy();
    }
    constructor(...args){
        super(...args);
        this.graphics = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();
        this.isOccupied = false;
    }
}



/***/ }),

/***/ "./src/constants/Directions.ts":
/*!*************************************!*\
  !*** ./src/constants/Directions.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DOWN": () => (/* binding */ DOWN),
/* harmony export */   "LEFT": () => (/* binding */ LEFT),
/* harmony export */   "MirrorOf": () => (/* binding */ MirrorOf),
/* harmony export */   "RIGHT": () => (/* binding */ RIGHT),
/* harmony export */   "UP": () => (/* binding */ UP)
/* harmony export */ });
const UP = 'up';
const RIGHT = 'right';
const DOWN = 'down';
const LEFT = 'left';
const MirrorOf = {
    [UP]: DOWN,
    [RIGHT]: LEFT,
    [DOWN]: UP,
    [LEFT]: RIGHT
};


/***/ }),

/***/ "./src/constants/Sizes.ts":
/*!********************************!*\
  !*** ./src/constants/Sizes.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CELL_SIZE": () => (/* binding */ CELL_SIZE)
/* harmony export */ });
// eslint-disable-next-line
const CELL_SIZE = 32;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
Object(function webpackMissingModule() { var e = new Error("Cannot find module './style.css'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _Main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Main */ "./src/Main.ts");
/* harmony import */ var _players_PacMan__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/players/PacMan */ "./src/players/PacMan.ts");
/* harmony import */ var _players_Monster__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/players/Monster */ "./src/players/Monster.ts");
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/Maps/One'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _mixins_ais_PlayerRandom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/mixins/ais/PlayerRandom */ "./src/mixins/ais/PlayerRandom.ts");






/* eslint-disable-next-line */ new _Main__WEBPACK_IMPORTED_MODULE_1__["default"]({
    getMap () {
        return new Object(function webpackMissingModule() { var e = new Error("Cannot find module '@/Maps/One'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    },
    getPlayers (app, map) {
        return [
            new _players_PacMan__WEBPACK_IMPORTED_MODULE_2__["default"]({
                app,
                map,
                control: true
            }),
            new _players_Monster__WEBPACK_IMPORTED_MODULE_3__["default"]({
                app,
                map,
                mixins: [
                    _mixins_ais_PlayerRandom__WEBPACK_IMPORTED_MODULE_4__["default"]
                ]
            }),
            new _players_Monster__WEBPACK_IMPORTED_MODULE_3__["default"]({
                app,
                map,
                mixins: [
                    _mixins_ais_PlayerRandom__WEBPACK_IMPORTED_MODULE_4__["default"]
                ]
            }),
            new _players_Monster__WEBPACK_IMPORTED_MODULE_3__["default"]({
                app,
                map,
                mixins: [
                    _mixins_ais_PlayerRandom__WEBPACK_IMPORTED_MODULE_4__["default"]
                ]
            })
        ];
    }
});


/***/ }),

/***/ "./src/mixins/ais/PlayerRandom.ts":
/*!****************************************!*\
  !*** ./src/mixins/ais/PlayerRandom.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PlayerRandom)
/* harmony export */ });
/* harmony import */ var _mixins_ais__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/mixins/ais */ "./src/mixins/ais/index.ts");
/* harmony import */ var _constants_Directions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/constants/Directions */ "./src/constants/Directions.ts");
/* harmony import */ var _utils_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/array */ "./src/utils/array.ts");
/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/players */ "./src/players/index.ts");




class PlayerRandom extends _mixins_ais__WEBPACK_IMPORTED_MODULE_0__["default"] {
    beforeDraw() {
        const directions = [
            _constants_Directions__WEBPACK_IMPORTED_MODULE_1__.UP,
            _constants_Directions__WEBPACK_IMPORTED_MODULE_1__.RIGHT,
            _constants_Directions__WEBPACK_IMPORTED_MODULE_1__.DOWN,
            _constants_Directions__WEBPACK_IMPORTED_MODULE_1__.LEFT
        ].filter((direction)=>{
            // Filter out where player can't go
            if (!this.player.canGo(direction)) {
                return false;
            }
            // If stopped let's remove the same direction
            if (this.player.status === _players__WEBPACK_IMPORTED_MODULE_3__["default"].STOPPED && direction === this.player.direction) {
                return false;
            }
            // Let's not turn back
            if (direction === _constants_Directions__WEBPACK_IMPORTED_MODULE_1__.MirrorOf[this.player.direction]) {
                return false;
            }
            return true;
        });
        if (directions.length === 0) {
            directions[0] = _constants_Directions__WEBPACK_IMPORTED_MODULE_1__.MirrorOf[this.player.direction];
        }
        // Handle dead end
        this.player.nextDirection = (0,_utils_array__WEBPACK_IMPORTED_MODULE_2__.randomItem)(directions);
        return true;
    }
}



/***/ }),

/***/ "./src/mixins/ais/index.ts":
/*!*********************************!*\
  !*** ./src/mixins/ais/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AI)
/* harmony export */ });
/* harmony import */ var _mixins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/mixins */ "./src/mixins/index.ts");

class AI extends _mixins__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(player){
        super();
        this.player = player;
    }
}



/***/ }),

/***/ "./src/mixins/index.ts":
/*!*****************************!*\
  !*** ./src/mixins/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Mixin)
/* harmony export */ });
class Mixin {
    beforeSetup() {
        return true;
    }
    afterSetup() {
        return true;
    }
    beforeDraw() {
        return true;
    }
    afterDraw() {
        return true;
    }
}
/* eslint-disable class-methods-use-this */ 


/***/ }),

/***/ "./src/players/Monster.ts":
/*!********************************!*\
  !*** ./src/players/Monster.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Monster)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");
/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/players */ "./src/players/index.ts");
/* harmony import */ var _constants_Sizes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/constants/Sizes */ "./src/constants/Sizes.ts");
/* harmony import */ var _constants_Directions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/constants/Directions */ "./src/constants/Directions.ts");




const ANIM_SCALE = 0.8;
class Monster extends _players__WEBPACK_IMPORTED_MODULE_1__["default"] {
    setupAnimationDirection() {
        const lastScaleX = this.animations.walk.scale.x;
        const scaleX = this.nextDirection === _constants_Directions__WEBPACK_IMPORTED_MODULE_3__.RIGHT ? -ANIM_SCALE : this.nextDirection === _constants_Directions__WEBPACK_IMPORTED_MODULE_3__.LEFT ? ANIM_SCALE : lastScaleX;
        Object.values(this.animations).forEach((anim)=>{
            // @ts-ignore
            anim.scale.set(scaleX, ANIM_SCALE);
        });
    }
    setAnimation() {
        switch(this.state){
            default:
            case Monster.RUNNING:
                this.animations.idle.visible = false;
                this.animations.walk.visible = true;
                break;
            case Monster.STOPPED:
                this.animations.idle.visible = true;
                this.animations.walk.visible = false;
                break;
        }
    }
    setupMonster() {
        const sheet = this.app.loader.resources.monster.spritesheet;
        const animations = this.animations = {
            walk: new pixi_js__WEBPACK_IMPORTED_MODULE_0__.AnimatedSprite(sheet.animations.Walk),
            idle: new pixi_js__WEBPACK_IMPORTED_MODULE_0__.AnimatedSprite(sheet.animations.Idle)
        };
        this.setAnimation();
        this.setupAnimationDirection();
        Object.values(animations).forEach((anim)=>{
            anim.x = 0;
            anim.y = _constants_Sizes__WEBPACK_IMPORTED_MODULE_2__.CELL_SIZE / 2 + 4 // some extra cuz of scaling
            ;
            anim.anchor.set(0.5, 1);
            anim.play();
        });
        animations.walk.animationSpeed = 1;
        animations.idle.animationSpeed = 0.3;
    }
    setup() {
        const { x , y , defaultDirection  } = this.getSpawnPosition();
        this.direction = this.nextDirection = defaultDirection;
        this.setupBase();
        this.setupMonster();
        this.container.x = x;
        this.container.y = y;
        this.container.width = _constants_Sizes__WEBPACK_IMPORTED_MODULE_2__.CELL_SIZE;
        this.container.height = _constants_Sizes__WEBPACK_IMPORTED_MODULE_2__.CELL_SIZE;
        this.container.addChild(this.base);
        this.container.addChild(this.animations.idle);
        this.container.addChild(this.animations.walk);
    }
    draw() {
        if (!this.beforeDraw()) {
            return;
        }
        if (this.previousState !== this.state) {
            this.setAnimation();
        }
        // Check buffered direction first
        if (this.nextDirection !== this.direction && this.tryNext(this.nextProps)) {
            this.setupAnimationDirection();
        } else {
            this.tryNext(this.currentProps);
        }
        this.afterDraw();
    }
    constructor(args){
        super(args);
        this.beforeSetup();
        this.setup();
        this.afterSetup();
    }
}



/***/ }),

/***/ "./src/players/PacMan.ts":
/*!*******************************!*\
  !*** ./src/players/PacMan.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PacMan)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");
/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/players */ "./src/players/index.ts");
/* harmony import */ var _constants_Sizes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/constants/Sizes */ "./src/constants/Sizes.ts");



class PacMan extends _players__WEBPACK_IMPORTED_MODULE_1__["default"] {
    setupPacMan1() {
        const PacMan1 = this.PacMan1 = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();
        PacMan1.beginFill(0xff9900);
        PacMan1.arc(0, 0, _constants_Sizes__WEBPACK_IMPORTED_MODULE_2__.CELL_SIZE * 2, Math.PI / 5, -Math.PI / 5, false);
        PacMan1.lineTo(0, 0);
        PacMan1.endFill();
        PacMan1.x = 0;
        PacMan1.y = 0;
        PacMan1.scale = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Point(0.25, 0.25);
    }
    setupPacMan2() {
        const PacMan2 = this.PacMan2 = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();
        PacMan2.beginFill(0xff9900);
        PacMan2.arc(0, 0, _constants_Sizes__WEBPACK_IMPORTED_MODULE_2__.CELL_SIZE * 2, Math.PI / 15, -Math.PI / 15, false);
        PacMan2.lineTo(0, 0);
        PacMan2.endFill();
        PacMan2.x = 0;
        PacMan2.y = 0;
        PacMan2.scale = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Point(0.25, 0.25);
    }
    setup() {
        const { x , y , defaultDirection  } = this.getSpawnPosition();
        this.direction = this.nextDirection = defaultDirection;
        this.setupBase();
        this.setupPacMan1();
        this.setupPacMan2();
        this.container.x = x;
        this.container.y = y;
        this.container.width = _constants_Sizes__WEBPACK_IMPORTED_MODULE_2__.CELL_SIZE;
        this.container.height = _constants_Sizes__WEBPACK_IMPORTED_MODULE_2__.CELL_SIZE;
        this.container.addChild(this.base);
        this.container.addChild(this.PacMan1);
        this.container.addChild(this.PacMan2);
    }
    draw() {
        if (!this.beforeDraw()) {
            return;
        }
        if (this.state === _players__WEBPACK_IMPORTED_MODULE_1__["default"].RUNNING && this.customLoopTimer++ > 4) {
            this.PacMan2.visible = !this.PacMan2.visible;
            this.customLoopTimer = 0;
        }
        // Check buffered direction first
        if (this.nextDirection !== this.direction && this.tryNext(this.nextProps)) {
        // eslint-disable-line
        } else {
            this.tryNext(this.currentProps) && (this.container.angle = this.currentProps.angle);
        }
        this.afterDraw();
    }
    constructor(args){
        super(args);
        this.customLoopTimer = 0;
        this.beforeSetup();
        this.setup();
        this.afterSetup();
    }
}



/***/ }),

/***/ "./src/players/index.ts":
/*!******************************!*\
  !*** ./src/players/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_keyboardEvents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/keyboardEvents */ "./src/utils/keyboardEvents.ts");
/* harmony import */ var _constants_Directions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/constants/Directions */ "./src/constants/Directions.ts");
/* harmony import */ var _cells_SpawnPoint__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/cells/SpawnPoint */ "./src/cells/SpawnPoint.ts");
/* harmony import */ var _constants_Sizes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/constants/Sizes */ "./src/constants/Sizes.ts");






const DIRECTION_PROPS = {
    [_constants_Directions__WEBPACK_IMPORTED_MODULE_3__.UP]: {
        angle: 270,
        direction: _constants_Directions__WEBPACK_IMPORTED_MODULE_3__.UP
    },
    [_constants_Directions__WEBPACK_IMPORTED_MODULE_3__.RIGHT]: {
        angle: 0,
        direction: _constants_Directions__WEBPACK_IMPORTED_MODULE_3__.RIGHT
    },
    [_constants_Directions__WEBPACK_IMPORTED_MODULE_3__.DOWN]: {
        angle: 90,
        direction: _constants_Directions__WEBPACK_IMPORTED_MODULE_3__.DOWN
    },
    [_constants_Directions__WEBPACK_IMPORTED_MODULE_3__.LEFT]: {
        angle: 180,
        direction: _constants_Directions__WEBPACK_IMPORTED_MODULE_3__.LEFT
    }
};
class Player {
    // eslint-disable-next-line
    get diff() {
        return _constants_Sizes__WEBPACK_IMPORTED_MODULE_5__.CELL_SIZE / 2;
    }
    get nextProps() {
        return DIRECTION_PROPS[this.nextDirection];
    }
    get currentProps() {
        return DIRECTION_PROPS[this.direction];
    }
    vx(dir) {
        return dir === _constants_Directions__WEBPACK_IMPORTED_MODULE_3__.LEFT ? this.velocity * -1 : dir === _constants_Directions__WEBPACK_IMPORTED_MODULE_3__.RIGHT ? this.velocity : 0;
    }
    vy(dir) {
        return dir === _constants_Directions__WEBPACK_IMPORTED_MODULE_3__.UP ? this.velocity * -1 : dir === _constants_Directions__WEBPACK_IMPORTED_MODULE_3__.DOWN ? this.velocity : 0;
    }
    setupBase() {
        const base = this.base = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();
        base.alpha = 0;
        base.beginFill(0xff99ff);
        base.drawRect(0, 0, _constants_Sizes__WEBPACK_IMPORTED_MODULE_5__.CELL_SIZE, _constants_Sizes__WEBPACK_IMPORTED_MODULE_5__.CELL_SIZE);
        base.endFill();
        base.x = _constants_Sizes__WEBPACK_IMPORTED_MODULE_5__.CELL_SIZE / -2;
        base.y = _constants_Sizes__WEBPACK_IMPORTED_MODULE_5__.CELL_SIZE / -2;
    }
    velocityByDirection(dir, additive = 0) {
        if (dir === _constants_Directions__WEBPACK_IMPORTED_MODULE_3__.DOWN || dir === _constants_Directions__WEBPACK_IMPORTED_MODULE_3__.RIGHT) {
            return this.velocity + additive;
        }
        return this.velocity + additive * -1;
    }
    // eslint-disable-next-line
    newCoordsByDirection(dir, x, y) {
        switch(dir){
            case _constants_Directions__WEBPACK_IMPORTED_MODULE_3__.UP:
                return [
                    x,
                    y - _constants_Sizes__WEBPACK_IMPORTED_MODULE_5__.CELL_SIZE
                ];
            case _constants_Directions__WEBPACK_IMPORTED_MODULE_3__.DOWN:
                return [
                    x,
                    y + _constants_Sizes__WEBPACK_IMPORTED_MODULE_5__.CELL_SIZE
                ];
            case _constants_Directions__WEBPACK_IMPORTED_MODULE_3__.RIGHT:
                return [
                    x + _constants_Sizes__WEBPACK_IMPORTED_MODULE_5__.CELL_SIZE,
                    y
                ];
            case _constants_Directions__WEBPACK_IMPORTED_MODULE_3__.LEFT:
                return [
                    x - _constants_Sizes__WEBPACK_IMPORTED_MODULE_5__.CELL_SIZE,
                    y
                ];
        }
        return [
            0,
            0
        ];
    }
    getSpawnPosition() {
        const cells = this.map.getCellsByType(_cells_SpawnPoint__WEBPACK_IMPORTED_MODULE_4__["default"]).filter(({ isOccupied  })=>!isOccupied);
        const cell = cells[Math.floor(Math.random() * cells.length)];
        cell.hasPlayer();
        return {
            x: cell.x + _constants_Sizes__WEBPACK_IMPORTED_MODULE_5__.CELL_SIZE / 2,
            y: cell.y + _constants_Sizes__WEBPACK_IMPORTED_MODULE_5__.CELL_SIZE / 2,
            defaultDirection: cell.defaultDirection
        };
    }
    canGo(direction) {
        const { x , y  } = this.container;
        const [newX, newY] = this.newCoordsByDirection(direction, x, y);
        const cell = this.map.getCellByCoords(newX, newY);
        return cell.walkThrough;
    }
    tryNext({ direction  }) {
        const { x , y  } = this.container;
        const width = _constants_Sizes__WEBPACK_IMPORTED_MODULE_5__.CELL_SIZE;
        const height = _constants_Sizes__WEBPACK_IMPORTED_MODULE_5__.CELL_SIZE;
        const newX = x + this.vx(direction);
        const newY = y + this.vy(direction);
        const cells = this.map.getNeighboursByCoords(x, y, width, height);
        for (const cell of cells){
            const diff = width / 2;
            if (!cell.walkThrough && (cell.containsPoint(newX - diff, newY - diff) || cell.containsPoint(newX + (diff - 4), newY + (diff - 4)) || cell.containsPoint(newX - diff, newY + (diff - 4)) || cell.containsPoint(newX + (diff - 4), newY - diff))) {
                this.previousState = this.state;
                this.state = this.direction === direction ? Player.STOPPED : Player.RUNNING;
                return false;
            }
        }
        this.state = Player.RUNNING;
        this.container.x = newX;
        this.container.y = newY;
        this.direction = direction;
        return true;
    }
    beforeDraw() {
        for (const mixin of this.mixins){
            if (mixin.beforeDraw && !mixin.beforeDraw()) {
                return false;
            }
        }
        return true;
    }
    afterDraw() {
        for (const mixin of this.mixins){
            if (mixin.afterDraw && !mixin.afterDraw()) {
                return false;
            }
        }
        return true;
    }
    beforeSetup() {
        for (const mixin of this.mixins){
            if (mixin.beforeSetup && !mixin.beforeSetup()) {
                return false;
            }
        }
        return true;
    }
    afterSetup() {
        for (const mixin of this.mixins){
            if (mixin.afterSetup && !mixin.afterSetup()) {
                return false;
            }
        }
        return true;
    }
    // eslint-disable-next-line
    draw() {
        if (!this.beforeDraw()) {
            return;
        }
        this.afterDraw();
    }
    bind() {
        if (!this.control) {
            return;
        }
        //Capture the keyboard arrow keys
        const left = (0,_utils_keyboardEvents__WEBPACK_IMPORTED_MODULE_2__["default"])('ArrowLeft'), up = (0,_utils_keyboardEvents__WEBPACK_IMPORTED_MODULE_2__["default"])('ArrowUp'), right = (0,_utils_keyboardEvents__WEBPACK_IMPORTED_MODULE_2__["default"])('ArrowRight'), down = (0,_utils_keyboardEvents__WEBPACK_IMPORTED_MODULE_2__["default"])('ArrowDown');
        left.press = ()=>this.nextDirection = _constants_Directions__WEBPACK_IMPORTED_MODULE_3__.LEFT;
        up.press = ()=>this.nextDirection = _constants_Directions__WEBPACK_IMPORTED_MODULE_3__.UP;
        right.press = ()=>this.nextDirection = _constants_Directions__WEBPACK_IMPORTED_MODULE_3__.RIGHT;
        down.press = ()=>this.nextDirection = _constants_Directions__WEBPACK_IMPORTED_MODULE_3__.DOWN;
        // Touch events
        const mc = new (hammerjs__WEBPACK_IMPORTED_MODULE_1___default())(document.documentElement);
        mc.get('pan').set({
            direction: (hammerjs__WEBPACK_IMPORTED_MODULE_1___default().DIRECTION_ALL),
            threshold: 10
        });
        mc.on('panleft panright panup pandown', (ev)=>{
            Math.abs(ev.velocity) > 0.2 && (this.nextDirection = ev.type.replace('pan', ''));
        });
    }
    constructor({ map , app , mixins =[] , control =false  }){
        this.container = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Container();
        this.direction = _constants_Directions__WEBPACK_IMPORTED_MODULE_3__.RIGHT;
        this.nextDirection = _constants_Directions__WEBPACK_IMPORTED_MODULE_3__.RIGHT;
        this.state = Player.RUNNING;
        this.previousState = Player.RUNNING;
        this.velocity = 4;
        this.map = map;
        this.app = app;
        this.control = control;
        // @ts-ignore
        this.mixins = mixins.map((mixin)=>new mixin(this));
        this.bind();
    }
}
Player.RUNNING = 'running';
Player.STOPPED = 'stopped';



/***/ }),

/***/ "./src/utils/array.ts":
/*!****************************!*\
  !*** ./src/utils/array.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "randomItem": () => (/* binding */ randomItem)
/* harmony export */ });
// eslint-disable-next-line
const randomItem = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};


/***/ }),

/***/ "./src/utils/keyboardEvents.ts":
/*!*************************************!*\
  !*** ./src/utils/keyboardEvents.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const keyboardEvents = function(value) {
    const key = {
        value,
        isDown: false,
        isUp: true,
        press: ()=>{},
        release: ()=>{},
        unsubscribe: ()=>{},
        handleDown (ev) {
            if (ev.key !== key.value) return;
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
            ev.preventDefault();
        },
        handleUp (ev) {
            if (ev.key !== key.value) return;
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
            ev.preventDefault();
        }
    };
    //Attach event listeners
    const downListener = key.handleDown.bind(key);
    const upListener = key.handleUp.bind(key);
    window.addEventListener('keydown', downListener, false);
    window.addEventListener('keyup', upListener, false);
    // Detach event listeners
    key.unsubscribe = ()=>{
        window.removeEventListener('keydown', downListener);
        window.removeEventListener('keyup', upListener);
    };
    return key;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (keyboardEvents);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkits_not_fair"] = self["webpackChunkits_not_fair"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["commons-_nvm_versions_node_v14_16_0_lib_node_modules_mhy_node_modules_eventemitter3_index_js--f00cbb","commons-node_modules_parse-uri_index_js-node_modules_pixi_js_lib_pixi_es_js","commons-node_modules_pixi_mesh-extras_lib_mesh-extras_es_js-node_modules_pixi_mixin-cache-as--be79ac","commons-node_modules_pixi_sprite-animated_lib_sprite-animated_es_js-node_modules_pixi_sprite--57b146"], () => (__webpack_require__("./src/index.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.7f6a0.js.map