var Game = require('game');
var GameData = require('gameData');
var Utils = require('utils');

Fire.Class({
    extends: Fire.Behavior,

    properties: {
        level: 0,
        gridIndex: 0,
        tempBullet: {
            default: null,
            type: Fire.Asset
        },
        image: {
            default: null,
            type:cc.Node
        },
        _rangeIconPos: null,
        _rangeIconScale: null,
        _target: null,
        _curTime: 0,
        //开火时间间隔
        _firingInterval: 0.3,
    },

    // 获取防御塔造成的伤害数值
    _getHurt: function () {
        var hurt = 1;
        if ( this.level === 2 ) {
            hurt = 2;
        }
        else if ( this.level === 3 ) {
            hurt = 3;
        }
        return hurt;
    },

    // 创建子弹
    _createBullet: function () {
        var bullet = Fire.instantiate(this.tempBullet);
        bullet.setPosition(this.getPosition());
        Game.instance.bulletLayer.addChild(bullet);
        Fire.mixin(bullet, 'bullet');
        bullet.init(this._target, this._getHurt());
    },

    _removeEnemy: function () {
        if (this._target) {
            this._target.setColor(new cc.Color(255, 255, 255));
            this._target = null;
        }
    },

    // 获取敌军目标
    _getEnemy: function () {
        if ( this._target ) {
            if (!Utils.hasAttackRange(this._target, this._rangeIconPos) || this._target.isDead ) {
                this._removeEnemy();
            }
            return;
        }
        var enemyList = Game.instance.ememyLayer.enemyList;
        for ( var i = 0, len = enemyList.length; i < len; ++i ) {
            var enemy = enemyList[i];
            if ( Utils.hasAttackRange(enemy, this._rangeIconPos) && !enemy.isDead && enemy.isVisible() ) {
                this._target = enemy;
                this._target.setColor(new cc.Color(255, 0, 0));
                break;
            }
        }
    },

    // 注册响应事件
    _registerTowersEvent: function () {
        var self = this;
        cc.eventManager.addListener(cc.EventListener.create({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan : function(touch, event) {
                var target = event.getCurrentTarget();
                Game.instance.towersCtrlMenu.setState(false);
                if ( !target.isVisible() ) {
                    return;
                }
                // 获取当前点击点所在相对按钮的位置坐标
                var locationInNode = target.image.convertToNodeSpace(touch.getLocation());
                var s = target.image.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if ( cc.rectContainsPoint(rect, locationInNode) ) {        // 点击范围判断检测
                    GameData.CurSelectTowersGridIndex = self.gridIndex;
                    Game.instance.towersCtrlMenu.setState(true, target, self._rangeIconScale);
                    return true;
                }
                return false;
            },
            onTouchEnded: function (touch, event) {            // 点击事件结束处理
                //cc.log("sprite onTouchesEnded.. ");
            }
        }), this);
    },
    // 根据防御塔的不同，攻击范围也会跟着改变
    _setRangePos: function (idx) {
        var scale = 1;
        if ( idx === 2 ) {
            scale = 1.5;
        }
        else if ( idx === 3 ) {
            scale = 2;
        }
        var pos = this.getPosition();
        this._rangeIconPos = new cc.rect(pos.x, pos.y, scale * 300, scale * 300);
        this._rangeIconScale = scale;
    },

    _setTexture: function (idx) {
        var url = Fire.url.raw("resoure/game/weapon_" + idx + ".png");
        var texture = cc.textureCache.addImage(url);
        this.image.setTexture(texture);
    },

    init: function (idx) {
        this._registerTowersEvent();
        this.level = idx;
        this._setTexture(idx);
        this._setRangePos(idx);
    },

    update: function (dt) {
        if ( !this.isVisible() ) {
            this._removeEnemy();
            return;
        }

        this._getEnemy();

        if ( this._target ) {
            // 设置朝向面对敌军
            var curPos = this.getPosition();
            var targetPos = this._target.getPosition();
            var angle = Math.atan2((targetPos.x - curPos.x), (targetPos.y - curPos.y)) * (180 / Math.PI);
            this.setRotation(angle);

            this._curTime += dt;

            if ( this._curTime > this._firingInterval ) {
                this._curTime = 0;
                this._createBullet();
            }
        }
    },
});
