var GameData = require('gameData');

Fire.Class({
    extends: Fire.Behavior,

    properties: {
        _show: false,
        _endTime: 2,
        _curTime: 0,
    },

    open: function (content) {
        this.setVisible(true);
        this.setString(content);
    },

    onLoad: function () {
        this._endTime = 2;
        this._curTime = 0;
    },

    update: function (dt) {
        if ( this.isVisible() && !this._show ) {
            this._show = true;
        }
        if ( this._show ) {
            this._curTime += dt;
        }
        if ( this._show && this._curTime > this._endTime ) {
            this._show = false;
            this.setVisible(false);
            this._curTime = 0;
        }

    },
});
