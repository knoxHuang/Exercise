var GameData = require('gameData');

Fire.Class({
    extends: Fire.Behavior,

    properties: {
        btn_Ctrl: {
            default: [],
            type: [cc.Node]
        },
        rangeIcon: {
            default: null,
            type: cc.Node
        }
    },

    _registerBtnEvent: function() {
        var self = this;
        for (var i = 0; i < this.btn_Ctrl.length; ++i) {
            this.btn_Ctrl[i].setName(i);
            this.btn_Ctrl[i].addTouchEventListener(function (sender, type) {
                if ( type !== ccui.Widget.TOUCH_ENDED ) {
                    return;
                }
                var towers = GameData.CurSelectTowersList[GameData.CurSelectTowersGridIndex];
                towers.setVisible(false);
                self.setVisible(false);
            });
        }
    },

    setState: function (show, target, rangeScale) {
        if ( !target && show ) {
            return;
        }
        if ( show ) {
            var pos = target.getPosition();
            this.setPosition(pos);
            this.rangeIcon.setScale(rangeScale, rangeScale);
            console.log(this.rangeIcon.getScale());
        }
        this.setVisible(show);
        for (var i = 0, len = this.btn_Ctrl.length; i < len; ++i) {
            var ctrl = this.btn_Ctrl[i];
            ctrl.setVisible(show);
        }
        this.rangeIcon.setVisible(show);
        console.log(this.rangeIcon.isVisible());
    },

    onLoad: function () {
        this._registerBtnEvent();
    }
});
