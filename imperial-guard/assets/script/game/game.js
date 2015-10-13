var VictoryMenu = require('victoryMenu');
var LoseMenu = require('loseMenu');
var PauseMenu = require('pauseMenu');
var GameData = require('gameData');

var GameState = Fire.defineEnum({
    GAME_STATE_IDLE: 0,
    GAME_STATE_RUN : 1,
    GAME_STATE_OVER : 2,
});

var Game = Fire.Class({
    extends: Fire.Behavior,

    properties: {
        uiLayer: {
            default: null,
            type: cc.Node
        },
        ememyLayer:{
            default: null,
            type: cc.Node
        },
        mapLayer: {
            default: null,
            type: cc.Node
        },
        bulletLayer: {
            default: null,
            type: cc.Node
        },
        towersLayer: {
            default: null,
            type: cc.Node
        },
        towersMenu: {
            default: null,
            type: cc.Node
        },
        towersCtrlMenu: {
            default: null,
            type: cc.Node
        },
        tipWin: {
            default: null,
            type: cc.Node
        },
        gameState: {
            default: GameState.GAME_STATE_IDLE,
            type: GameState
        }
    },

    statics: {
        instance: null
    },

    // 1 = 100 2 = 200 3 = 300
    HasTowerNeedGold: function (index) {
        var needGold = parseInt(index + "00");
        if ( GameData.CurGold >= needGold ) {
            GameData.CurGold -= needGold
            this.uiLayer.refreshGold();
            return true;
        }
        return false;
    },

    onLoad: function () {
        Game.instance = this;
        this.start();
    },

    start: function () {
        cc.director.resume();
        GameData.refreshLevelData();
        cc.director.getScheduler().setTimeScale(GameData.CurSpeedUp);
        this.mapLayer.init();
        this.uiLayer.init();
        this.ememyLayer.init();
        this.gameState = GameState.GAME_STATE_RUN
    },

    isWin: function () {
        for (var i = 0, len = this.ememyLayer.enemyList.length; i < len; ++i) {
            var enemy = this.ememyLayer.enemyList[i];
            if ( !enemy.isDead ) {
                return false;
            }
        }
        return true;
    },

    onLoseEvent: function () {
        cc.director.pause();
        this.gameState = GameState.GAME_STATE_OVER;
        LoseMenu.instance.openWindow();
        Game.instance.towersMenu.setState(false);
        Game.instance.towersCtrlMenu.setVisible(false);
    },

    onWinEvent: function () {
        this.gameState = GameState.GAME_STATE_OVER;
        VictoryMenu.instance.openWindow();
        Game.instance.towersMenu.setState(false);
        Game.instance.towersCtrlMenu.setVisible(false);
    },

    onPauseEvent: function () {
        cc.director.pause();
        PauseMenu.instance.openWindow();
        Game.instance.towersMenu.setState(false);
        Game.instance.towersCtrlMenu.setVisible(false);
    },

    update: function (dt) {
        switch (this.gameState) {
            case GameState.GAME_STATE_IDLE:

                break;
            case GameState.GAME_STATE_RUN:
                if (GameData.CurHp <= 0) {
                    GameData.CurHp = 0;
                    Game.instance.onLoseEvent();
                }
                else {
                    if (this.isWin()) {
                        this.onWinEvent();
                    }
                }
                break;
            case GameState.GAME_STATE_OVER:

                break;
        }
    },
});
