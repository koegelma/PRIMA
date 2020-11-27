"use strict";
var L12_Doom_Enemy_Sprites;
(function (L12_Doom_Enemy_Sprites) {
    var fc = FudgeCore;
    var fcaid = FudgeAid;
    let ANGLE;
    (function (ANGLE) {
        // N = 0, NE = 1, E = 2, SE = 3, S = 4, SW = 5, W = 6, NW = 7,
        ANGLE[ANGLE["_000"] = 0] = "_000";
        ANGLE[ANGLE["_045"] = 1] = "_045";
        ANGLE[ANGLE["_090"] = 2] = "_090";
        ANGLE[ANGLE["_135"] = 3] = "_135";
        ANGLE[ANGLE["_180"] = 4] = "_180";
        ANGLE[ANGLE["_225"] = 5] = "_225";
        ANGLE[ANGLE["_270"] = 6] = "_270";
        ANGLE[ANGLE["_315"] = 7] = "_315";
    })(ANGLE = L12_Doom_Enemy_Sprites.ANGLE || (L12_Doom_Enemy_Sprites.ANGLE = {}));
    class Enemy extends fc.Node {
        constructor(_name = "Enemy", _position) {
            super(_name);
            this.speed = 1;
            this.addComponent(new fc.ComponentTransform());
            this.mtxLocal.translation = _position;
            this.show = new fcaid.Node("Show", fc.Matrix4x4.IDENTITY());
            this.appendChild(this.show);
            this.sprite = new fcaid.NodeSprite("Sprite");
            this.show.appendChild(this.sprite);
            this.sprite.setAnimation(Enemy.animations["Idle_000"]);
            this.sprite.setFrameDirection(1);
            this.sprite.framerate = 2;
            this.posTarget = _position;
        }
        static generateSprites(_spritesheet) {
            Enemy.animations = {};
            for (let angle = 0; angle < 5; angle++) {
                let name = "Idle" + ANGLE[angle];
                let sprite = new fcaid.SpriteSheetAnimation(name, _spritesheet);
                sprite.generateByGrid(fc.Rectangle.GET(44, 33, 63, 66), 3, 32, fc.ORIGIN2D.BOTTOMCENTER, fc.Vector2.Y(100));
                Enemy.animations[name] = sprite;
            }
        }
        hndEnemy() {
            if (this.mtxLocal.translation.equals(this.posTarget, 0.1))
                this.chooseTargetPosition();
            this.moveEnemy();
        }
        rotateEnemy(_avatarTranslation) {
            this.cmpTransform.showTo(_avatarTranslation);
        }
        moveEnemy() {
            //this.rotateEnemy(_avatarTranslation);
            this.mtxLocal.showTo(this.posTarget);
            this.mtxLocal.translateZ(this.speed * fc.Loop.timeFrameGame / 1000);
            this.show.mtxLocal.showTo(fc.Vector3.TRANSFORMATION(L12_Doom_Enemy_Sprites.avatar.mtxLocal.translation, this.mtxWorldInverse, true));
            this.mtxLocal.translateZ(0.06);
        }
        chooseTargetPosition() {
            let range = 5; //sizeWall * numWalls / 2 - 2;
            this.posTarget = new fc.Vector3(fc.Random.default.getRange(-range, range), 0, fc.Random.default.getRange(-range, range));
            console.log("New target", this.posTarget.toString());
        }
    }
    L12_Doom_Enemy_Sprites.Enemy = Enemy;
})(L12_Doom_Enemy_Sprites || (L12_Doom_Enemy_Sprites = {}));
//# sourceMappingURL=Enemy.js.map