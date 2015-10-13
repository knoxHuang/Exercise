var Game = require('game');
var GameData = require('gameData');

Fire.Class({
    extends: Fire.Behavior,

    properties: {
        tempTowers: {
            default: null,
            type: Fire.Asset
        },
        btn_towers: {
            default: [],
            type: [cc.Node]
        },
    },

    _createTowers: function (target) {
        var towers = null;
        if ( !GameData.CurSelectTowersList[GameData.CurTowersGridIndex] ) {
            towers = Fire.instantiate(this.tempTowers);
            towers.setPosition(GameData.CurSelectTempTowers.getPosition());
            towers.gridIndex = GameData.CurTowersGridIndex;
            GameData.CurSelectTowersList[GameData.CurTowersGridIndex] = towers;
            Game.instance.towersLayer.addChild(towers);
        }
        else {
            towers = GameData.CurSelectTowersList[GameData.CurTowersGridIndex];
            towers.setVisible(true);
        }
        var idx = parseInt(target.getName()) + 1;
        towers.setName(target.getName());
        towers.init(idx);
    },

    _registerBtnEvent: function() {
        var self = this;
        for (var i = 0; i < this.btn_towers.length; ++i) {
            this.btn_towers[i].setName(i);
            this.btn_towers[i].addTouchEventListener(function (sender, type) {
                if ( type !== ccui.Widget.TOUCH_ENDED ) {
                    return;
                }
                var idx = parseInt(sender.getName()) + 1;
                if ( !Game.instance.HasTowerNeedGold(idx) ) {
                    Game.instance.tipWin.open('No money, no tower..');
                    return;
                }
                self.setVisible(false);
                self._createTowers(sender);
            });
        }
    },

    setState: function (show) {
        this.setVisible(show);
        for (var i = 0, len = this.btn_towers.length; i < len; ++i) {
            var towers = this.btn_towers[i];
            towers.setVisible(show);
        }
    },

    onLoad: function () {
        this._registerBtnEvent();
    }
});
