var GameData = require('gameData');
var UILayer = require('uiLayer');
var Utils = require('utils');

Fire.Class({
    extends: Fire.Behavior,

    properties: {
        tempHp: {
            default: null,
            type: Fire.Asset
        },
        curHp: 5,
        maxHp: 5,
        isDead: false,
        _hasBoss: false,
        _speed: 150,
        _idx: 0,
        _pathList: [],
        _hpEnt: null,
    },

    _setHpPos: function () {
        var newPos = this.getPosition();
        newPos.y = newPos.y + 40;
        this._hpEnt.setPosition(newPos);
    },

    _createHp: function () {
        if ( this._hpEnt ) {
            return;
        }
        this._hpEnt = Fire.instantiate(this.tempHp);
        this._setHpPos();
        this._hpEnt.setPercent((this.curHp / this.maxHp) * 100);
        this.getParent().addChild(this._hpEnt);
        this._hpEnt.setVisible(false);
    },

    // 让物体朝目标移动的方法
    _startMove: function() {
        this._pathList = GameData.getLevelPath();
        this.setPosition(GameData.getLevelEntrancePos());
        this._move();
        this._hpEnt.setVisible(true);
        this.setVisible(true);
    },

    _move: function () {
        if ( this.isDead ) {
            return;
        }

        if ( this._idx >= this._pathList.length ) {
            // 说明抵达终点，没有被消灭
            UILayer.instance.refreshCurHp(this._hasBoss);
            this._stopMove();
            this._hpEnt.setVisible(false);
            this.setVisible(false);
            this.isDead = true;
            return;
        }

        var index = this._pathList[this._idx];
        var nextPos = GameData.CurLevelPathPos[index];
        var curPos = this.getPosition();
        if ( !this._hasBoss ) {
            var angle = Math.atan2((curPos.x - nextPos.x), (curPos.y - nextPos.y)) * (180 / Math.PI);
            if ( this._idx === 0 ) {
                angle = -90;
            }
            this.setRotation(angle);
        }

        var distance = cc.pDistance(curPos, nextPos);
        var time = distance / this._speed;

        this._idx++;

        var moveAction = cc.moveTo(time, nextPos);
        var callback = cc.callFunc(this._move, this);
        this.runAction(cc.sequence(moveAction, callback));
    },

    _stopMove: function () {
        this.stopAction();
        this._idx = 0;
        this._pathList = [];
        this._hpEnt.setVisible(false);
        this.setVisible(false);
    },

    injured: function (hurt) {
        this.curHp -= hurt;
        if ( this._hpEnt ) {
            this._hpEnt.setPercent((this.curHp / this.maxHp) * 100);
        }
        if ( this.curHp <= 0 ) {
            GameData.CurGold += 50;
            UILayer.instance.refreshGold();
            this.isDead = true;
            this._stopMove();
        }
    },

    start: function () {
        UILayer.instance.refreshCurRound();
        this._stopMove();
        this._startMove();
    },

    init: function (hasBoss) {
        var idx, url;
        if ( hasBoss ) {
            this.maxHp = GameData.getLevelBossEnemyHp();
            this.curHp = GameData.getLevelBossEnemyHp();
            idx = Math.floor(Math.random() * 5) + 1;
            url = Fire.url.raw("resoure/game/boss" + idx + ".png");
        }
        else {
            var random = Utils.Random(-(GameData.getLevelEnemyHp() / 2 ) , GameData.getLevelEnemyHp());
            this.maxHp = GameData.getLevelEnemyHp() + random;
            this.curHp = GameData.getLevelEnemyHp() + random;
            idx = Math.floor(Math.random() * 2) + 1;
            url = Fire.url.raw("resoure/game/enemy_" + idx + ".png");
        }
        var texture = cc.textureCache.addImage(url);
        this.setTexture(texture);
        this.setRotation(0);
        this._hasBoss = hasBoss;
        this._createHp();
        this.isDead = false;
        this.setVisible(false);
    },

    update: function (dt) {
        if ( this._hpEnt && this._hpEnt.isVisible() )  {
            this._setHpPos();
        }
    },
});
