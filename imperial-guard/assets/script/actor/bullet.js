var GameData = require('gameData');

Fire.Class({
    extends: Fire.Behavior,

    properties: {
        _speed: 10,
        _target: null,
        _hurt: 1,
    },

    _hitTarget: function () {
        this._target.injured(this._hurt);
        this._hide();
    },

    _hide: function () {
        this.setPosition(cc.p(-2000, 0));
        this.setVisible(false);
    },

    init: function (target, hurt) {
        this._target = target;
        this._hurt = hurt;
    },

    update: function (dt) {
        if ( !this.isVisible() ) {
            return;
        }

        if ( this._target.isDead ) {
            this._hide();
            return;
        }

        var eBox = this._target.getBoundingBox();
        var bBox = this.getBoundingBox();
        // 如果子弹与目标相交，说明子弹已命中敌方
        if( cc.rectIntersectsRect(bBox, eBox) ) {
            this._hitTarget();
        }

        // 让物体朝目标移动的方法
        var targetPos = this._target.getPosition();
        var curPos = this.getPosition();

        var x = Math.lerp(curPos.x, targetPos.x, dt * this._speed);
        var y = Math.lerp(curPos.y, targetPos.y, dt * this._speed);
        this.setPosition(cc.p(x, y));
    },
});
