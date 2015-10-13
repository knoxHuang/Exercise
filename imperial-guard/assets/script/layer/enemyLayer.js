var GameData = require('gameData');

var EnemyLayer = Fire.Class({
    extends: Fire.Behavior,

    properties: {
        tempEnemy: {
            default: null,
            type: Fire.Asset
        },
        tempBoss: {
            default: null,
            type: Fire.Asset
        },
        enemyList: [],
        _initEnemyList: [],
        _ready: false,
        _curTime: 0,
        _delayTime: 1,
    },

    statics: {
        instance: null
    },

    _createEnemy: function () {
        for (var i = 0; i < GameData.CurMaxRound; ++i) {
            var enemy = Fire.instantiate(this.tempEnemy);
            enemy.setName("enemy_" + i);
            this.addChild(enemy);
            var hasBoss = (GameData.CurMaxRound - this._initEnemyList.length) === 1;
            enemy.init(hasBoss);
            this.enemyList.push(enemy);
            this._initEnemyList.push(enemy);
            if (this._initEnemyList.length === GameData.CurMaxRound) {
                this._ready = true;
            }
        }
        this._ready = true;
    },

    _reset: function () {
        this.enemyList = [];
        this._initEnemyList = [];
    },

    init: function () {
        EnemyLayer.instance = this;
        this._reset();
        this._createEnemy();
    },

    update: function (dt) {
        if ( !this._ready ) {
            return;
        }
        if ( GameData.CurRound === GameData.CurMaxRound ) {
            return;
        }

        this._curTime += dt;

        if ( this._curTime > (this._delayTime / GameData.CurSpeedUp) )  {
            this._curTime = 0;
            GameData.CurRound++;
            this._initEnemyList[GameData.CurRound-1].start();
        }
    }
});
