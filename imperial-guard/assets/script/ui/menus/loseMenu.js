var LoseMenu = Fire.Class({
    extends: Fire.Behavior,

    properties: {
        btn_home: {
            default: null,
            type: cc.Node
        },
        btn_reset: {
            default: null,
            type: cc.Node
        }
    },

    statics: {
        instance: null
    },

    _goToHome: function () {
        this.closeWindow();
        Fire.engine.loadScene('main');
    },

    _resetScreen: function () {
        this.closeWindow();
        cc.director.resume();
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
        self.btn_reset.addTouchEventListener(function (sender, type) {
            if ( type !== ccui.Widget.TOUCH_ENDED ) {
                return;
            }
            self._resetScreen();
        });
    },

    openWindow: function () {
        this.setVisible(true);
    },

    closeWindow: function () {
        this.setVisible(false);
    },

    onLoad: function () {
        LoseMenu.instance = this;
        this._registerBtnEvent();
    }
});
