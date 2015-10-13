Fire.Class({
    extends: Fire.Behavior,

    properties: {
        btnPlay: {
            default: null,
            type: cc.Node
        }
    },

    _registerBtnEvent: function () {
        this.btnPlay.addTouchEventListener(function (sender, type) {
            if ( type !== ccui.Widget.TOUCH_ENDED ) {
                return;
            }
            Fire.engine.loadScene( 'level' );
        });
    },

    onLoad: function () {
        this._registerBtnEvent();
    }
});
