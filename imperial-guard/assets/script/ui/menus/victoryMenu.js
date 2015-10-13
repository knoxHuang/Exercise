var GameData = require('gameData');

var VictorMenu = Fire.Class({
    extends: Fire.Behavior,

    properties: {
        starList: {
            default: [],
            type: [cc.Node]
        },
        btn_home: {
            default: null,
            type: cc.Node
        },
        btn_next: {
            default: null,
            type: cc.Node
        },
        btn_reset: {
            default: null,
            type: cc.Node
        }
    },

    statics: {
        instance: null,
    },

    _setStarSate: function () {
        if ( GameData.CurHp === GameData.CurMaxHp ) {
            this.starList[0].setSelected(true);
            this.starList[1].setSelected(true);
            this.starList[2].setSelected(true);
        }
        else if ( GameData.CurHp > GameData.CurMaxHp / 2 ) {
            this.starList[0].setSelected(true);
            this.starList[1].setSelected(true);
            this.starList[2].setSelected(false);
        }
        else {
            this.starList[0].setSelected(true);
            this.starList[1].setSelected(false);
            this.starList[2].setSelected(false);
        }
    },

    _goToHome: function () {
        this.closeWindow();
        Fire.engine.loadScene('main');
    },

    _goToNextLevel: function () {
        GameData.CurLevel++;
        this.closeWindow();
        Fire.engine.loadScene('game');
    },

    _reset: function () {
        this.closeWindow();
        Fire.engine.loadScene('game');
    },

    _registerBtnEvent: function () {
        var self = this;
        self.btn_home.addTouchEventListener(function (sender, type) {
            if ( type !== ccui.Widget.TOUCH_ENDED ) {
                return;
            }
            self._goToHome();
        });
        self.btn_next.addTouchEventListener(function (sender, type) {
            if ( type !== ccui.Widget.TOUCH_ENDED ) {
                return;
            }
            self._goToNextLevel();
        });
        self.btn_reset.addTouchEventListener(function (sender, type) {
            if ( type !== ccui.Widget.TOUCH_ENDED ) {
                return;
            }
            self._reset();
        });
    },

    openWindow: function () {
        if ( GameData.CurLevel === 3 ) {
            this.btn_next.setVisible(false);
        }
        this._setStarSate();
        this.setVisible(true);
    },

    closeWindow: function () {
        this.setVisible(false);
    },

    onLoad: function () {
        VictorMenu.instance = this;
        this._registerBtnEvent();
    }
});
