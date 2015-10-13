var GameData = require('gameData');

Fire.Class({
    extends: Fire.Behavior,

    properties: {
        btn_levels: {
            default: [],
            type: [cc.Node]
        }
    },

    _registerBtnEvent: function() {
        for (var i = 0; i < this.btn_levels.length; ++i) {
            this.btn_levels[i].addTouchEventListener(function (idx,sender, type) {
                if ( type !== ccui.Widget.TOUCH_ENDED ) {
                    return;
                }
                GameData.CurLevel = (idx + 1);
                Fire.engine.loadScene('game');
            }.bind(this, i));
        }
    },

    onLoad: function () {
        this._registerBtnEvent();
    }
});
