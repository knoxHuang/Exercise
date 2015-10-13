
var GameData = {
    CurHp: 10,
    CurMaxHp: 10,
    CurLevel: 1,
    CurRound: 0,
    CurMaxRound: 1,
    CurGold: 300,
    CurSpeedUp: 1, // 1 = x1倍   2 = x2倍
    CurSelectTempTowers: null,
    CurSelectTowersGridIndex: -1,
    CurSelectTowersList: {},
    CurLevelPath: {},
    CurLevelPathPos: {},
    LevelMap: {}
};


GameData.refreshLevelData = function () {
    this.CurHp = 10;
    this.CurMaxHp = 10;
    this.CurRound = 0;
    this.CurSpeedUp = 1;
    this.CurLevelPathPos = {};
    this.CurLevelPath = {};
    this.CurSelectTempTowers = null;
    this.CurSelectTowersGridIndex = -1;
    this.CurSelectTowersList = {};
    this.CurRound = 0;
    if ( this.CurLevel === 1 ) {
        this.CurMaxRound = this.level1MaxRound;
        this.CurGold = this.level1Gole;
        this.LevelMap = this.LevelMap1;
    }
    else if ( this.CurLevel === 2 ) {
        this.CurMaxRound = this.level2MaxRound;
        this.CurGold = this.level2Gole;
        this.LevelMap = this.LevelMap2;
    }
    else if ( this.CurLevel === 3 ) {
        this.CurMaxRound = this.level3MaxRound;
        this.CurGold = this.level3Gole;
        this.LevelMap = this.LevelMap3;
    }
}

GameData.getLevelEnemyHp = function () {
    if ( this.CurLevel === 1 ) {
        return this.level1EnemyHp;
    }
    else if ( this.CurLevel === 2 ) {
        return this.level2EnemyHp;
    }
    else if ( this.CurLevel === 3 ) {
        return this.level3EnemyHp;
    }
    return 5;
}

GameData.getLevelBossEnemyHp = function () {
    if ( this.CurLevel === 1 ) {
        return this.level1BossEnemyHp;
    }
    else if ( this.CurLevel === 2 ) {
        return this.level2BossEnemyHp;
    }
    else if ( this.CurLevel === 3 ) {
        return this.level3BossEnemyHp;
    }
    return 10;
}

GameData.getLevelPath = function () {
    if ( this.CurLevel === 1 ) {
        return this.getLevel1Path();
    }
    else if ( this.CurLevel === 2 ) {
        return this.getLevel2Path();
    }
    else if ( this.CurLevel === 3 ) {
        return this.getLevel3Path();
    }
    return null;
}

GameData.getLevelEntrancePos = function () {
    var idx = -1;
    if ( this.CurLevel == 1 ) {
        idx = this.level1EntrancePos;
    }
    else if ( this.CurLevel == 2 ) {
        idx = this.level2EntrancePos;
    }
    else if ( this.CurLevel == 3 ) {
        idx = this.level3EntrancePos;
    }
    return this.CurLevelPathPos[idx];
}

//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------

// 关卡1数据
GameData.level1MaxRound = 10;
GameData.level1Gole = 200;
GameData.level1EnemyHp = 5;
GameData.level1BossEnemyHp = 20;
GameData.level1EntrancePos = 6;

// 路线索引
GameData.getLevel1Path = function () {
    var rand = Math.random() * 2;
    if ( rand < 1 ) {
        return this.Level1Path1;
    }
    return this.Level1Path2;
}

GameData.LevelMap1 = [
    1,1,1,0,0,0,1,1,0,0,0,1,1,
    0,0,0,0,2,0,0,0,0,2,0,0,3,
    1,1,1,0,0,0,1,1,0,0,0,1,1,
];

GameData.Level1Path1 = [6, 7, 8, 9, 0, 1, 2, 10, 11, 12, 13, 3, 4, 5, 14, 15, 16 ];
GameData.Level1Path2 = [6, 7, 8, 9, 17, 18, 19, 10, 11, 12, 13, 20, 21, 22, 14, 15, 16 ];

//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------

// 关卡2数据
GameData.level2MaxRound = 20;
GameData.level2Gole = 300;
GameData.level2EnemyHp = 10;
GameData.level2BossEnemyHp = 30;
GameData.level2EntrancePos = 8;

// 路线索引
GameData.getLevel2Path = function () {
    return this.Level2Path;
}

GameData.LevelMap2 = [
    1,1,1,1,1,1,2,0,0,0,0,0,3,
    1,1,1,1,1,1,2,0,2,2,1,1,1,
    1,1,1,1,1,1,2,0,2,1,1,1,1,
    0,0,0,0,0,0,0,0,2,1,1,1,1,
];

GameData.Level2Path = [8, 9, 10, 11, 12, 13, 14, 15, 7, 6, 0, 1, 2, 3, 4, 5];

//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------

// 关卡33数据
GameData.level3MaxRound = 100;
GameData.level3Gole = 600;
GameData.level3EnemyHp = 20;
GameData.level3BossEnemyHp = 50;

// 路线索引
GameData.getLevel3Path = function () {
    var rand = Math.random() * 2;
    if ( rand < 1 ) {
        this.level3EntrancePos = 0;
        return this.Level3Path1;
    }
    this.level3EntrancePos = 15;
    return this.Level3Path2;
}

GameData.LevelMap3 = [
    0,0,0,0,0,0,0,2,1,1,1,1,1,
    1,1,1,1,1,2,0,0,0,0,0,0,3,
    1,1,1,1,1,2,0,2,2,1,1,1,1,
    0,0,0,0,0,0,0,2,1,1,1,1,1,
];

GameData.Level3Path1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
GameData.Level3Path2 = [15, 16, 17, 18, 19, 20, 21, 14, 7, 8, 9, 10, 11, 12, 13];


module.exports = GameData;