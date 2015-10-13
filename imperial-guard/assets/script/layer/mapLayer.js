var Game = require('game');
var GameData = require('gameData');

Fire.Class({
    extends: Fire.Behavior,

    properties: {
        planetLayer: {
            default: null,
            type: cc.Node
        },
        tempGrid: {
            default: null,
            type: Fire.Asset
        },
        tempTowersGrid: {
            default: null,
            type: Fire.Asset
        },
        tempPlanet: {
            default: null,
            type: Fire.Asset
        }
    },

    _createMap: function () {
        var towerList = [];
        var count = 0;
        var i = 0, x = 0, y = 0, toweridx = -1, node = null;
        for (i = 0; i < GameData.LevelMap.length; ++i) {
            node = null;
            var idx = GameData.LevelMap[i];
            var tower = {
                idx: -1,
                pos: cc.Point(0,0)
            };
            if ( i % 13 === 0 ) {
                y++;
                x = 0;
            }
            if ( idx === 0 ) {
                node = Fire.instantiate(this.tempGrid);
                this.addChild(node);
            }
            else if ( idx === 2 ) {
                toweridx++;
                tower.idx = toweridx;
                tower.pos = new cc.Point(-620 + x * 96, 220 - y * 96);
                towerList.push(tower);
            }
            else if ( idx === 3 ) {
                node = Fire.instantiate(this.tempPlanet);
                this.planetLayer.addChild(node);
                Game.instance.uiLayer.setPlanetNode(node);
            }

            if ( node ) {
                var point = new cc.Point(-620 + x * 96, 220 - y * 96);
                node.setPosition(point);
                //var label = node.getChildByName('text');
                //var content = point.x + ":" + point.y + "=" + count;
                //label.setString(content);
                GameData.CurLevelPathPos[count] = point;
                count++;
            }
            x++;
        }
        //
        for (i = 0; i < towerList.length; ++i) {
            var tower = towerList[i];
            node = Fire.instantiate(this.tempTowersGrid);
            this._addMouseButtonListener(node);
            node.setPosition(tower.pos);
            node.setName(tower.idx);
            this.addChild(node);
        }
    },

    _showTowersMenu: function (show, target) {
        var towersMenu = Game.instance.towersMenu;
        towersMenu.setVisible(show);
        if ( !target ) {
            return;
        }
        var pos = target.getPosition();
        towersMenu.setPosition(pos);
    },

    _addMouseButtonListener: function (btn) {
        var self = this;
        cc.eventManager.addListener(cc.EventListener.create({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan : function(touch, event) {
                var target = event.getCurrentTarget();    // 获取事件所绑定的 target
                // 获取当前点击点所在相对按钮的位置坐标
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                GameData.CurSelectTempTowers = null;
                GameData.CurTowersGridIndex = -1;
                // 点击范围判断检测
                if ( cc.rectContainsPoint(rect, locationInNode )) {
                    var towersGridIndex = parseInt(target.getName()) + 1;
                    var towers = GameData.CurSelectTowersList[towersGridIndex];
                    GameData.CurTowersGridIndex = towersGridIndex;
                    if ( towers && towers.isVisible() ) {
                        return;
                    }
                    self._showTowersMenu(true, target);
                    GameData.CurSelectTempTowers = target;
                    return true;
                }
                self._showTowersMenu(false);
                return false;
            },
            // 点击事件结束处理
            onTouchEnded: function (touch, event) {
                //cc.log("sprite onTouchesEnded.. ");
            }
        }), btn);
    },

    init: function () {
        this._createMap();
    }
});
