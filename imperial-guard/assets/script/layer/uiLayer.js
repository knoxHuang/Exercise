var Game = require('game');
var GameData = require('gameData');

var UILayer = Fire.Class({
    extends: Fire.Behavior,

    properties: {
        // 关卡
        level: {
            default: null,
            type: cc.Node
        },
        // 金币
        gold: {
            default: null,
            type: cc.Node
        },
        // 生命值
        hp: {
            default: null,
            type: cc.Node
        },
        // 进攻次数
        round: {
            default: null,
            type: cc.Node
        },
        // 加速
        btnSpeedUp: {
            default: null,
            type: cc.Node
        },
        // 加速 X1 图标
        speedUp1: {
            default: null,
            type: cc.Node
        },
        // 加速 X2 图标
        speedUp2: {
            default: null,
            type: cc.Node
        },
        // 暂停
        btnPause: {
            default: null,
            type: cc.Node
        },
        _planetNode: null
    },

    statics: {
        instance: null
    },

    _resetUI: function () {
        this.level.setString(GameData.CurLevel);
        this.gold.setString(GameData.CurGold);
        this.round.setString(GameData.CurRound + "/" + GameData.CurMaxRound);
        this.hp.setString(GameData.CurHp);
        this._refreshSpeedUp();
    },

    _refreshSpeedUp: function () {
        this.speedUp1.setVisible(false);
        this.speedUp2.setVisible(false);
        if ( GameData.CurSpeedUp === 1 ) {
            this.speedUp1.setVisible(true);
        }
        else {
            this.speedUp2.setVisible(true);
        }
    },

    _registerBtnEvent: function () {
        var self = this;
        self.btnSpeedUp.addTouchEventListener(function (sender, type) {
            if ( type !== ccui.Widget.TOUCH_ENDED ) {
                return;
            }
            GameData.CurSpeedUp = GameData.CurSpeedUp === 1 ? 2 : 1;
            cc.director.getScheduler().setTimeScale(GameData.CurSpeedUp);
            self._refreshSpeedUp();
        });
        self.btnPause.addTouchEventListener(function (sender, type) {
            if ( type !== ccui.Widget.TOUCH_ENDED ) {
                return;
            }
            Game.instance.onPauseEvent();
        });
    },

    setPlanetNode: function (node) {
        this._planetNode = node;
    },

    refreshGold: function () {
        this.gold.setString(GameData.CurGold);
    },

    refreshCurHp: function (hasBoss) {
        var buckleBlood = 1;
        if ( hasBoss ){
            buckleBlood+=2;
        }
        GameData.CurHp -= buckleBlood;
        if ( GameData.CurHp < 0 ) {
            GameData.CurHp = 0;
        }

        this._planetNode.setColor(new cc.color(255,0,0));
        this.scheduleOnce(function(){
            this._planetNode.setColor(new cc.color(255,255,255));
        }, 0.1);

        this.hp.setString(GameData.CurHp);
    },

    refreshCurRound: function () {
        this.round.setString(GameData.CurRound + "/" + GameData.CurMaxRound);
    },

    onLoad: function () {
        UILayer.instance = this;
    },

    init: function () {
        this._resetUI();
        this._registerBtnEvent();
    }
});
