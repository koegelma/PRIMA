"use strict";
var L13_Doom_State_Machine;
(function (L13_Doom_State_Machine) {
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
    })(ANGLE = L13_Doom_State_Machine.ANGLE || (L13_Doom_State_Machine.ANGLE = {}));
    let JOB;
    (function (JOB) {
        JOB[JOB["IDLE"] = 0] = "IDLE";
        JOB[JOB["PATROL"] = 1] = "PATROL";
    })(JOB = L13_Doom_State_Machine.JOB || (L13_Doom_State_Machine.JOB = {}));
    class Enemy extends fc.Node {
        constructor(_name = "Enemy", _position) {
            super(_name);
            this.speed = 3;
            this.angleView = 0;
            this.job = JOB.PATROL;
            this.addComponent(new fc.ComponentTransform());
            this.mtxLocal.translation = _position;
            this.show = new fcaid.Node("Show", fc.Matrix4x4.IDENTITY());
            this.appendChild(this.show);
            this.sprite = new fcaid.NodeSprite("Sprite");
            this.sprite.addComponent(new fc.ComponentTransform());
            this.show.appendChild(this.sprite);
            this.sprite.setAnimation(Enemy.animations["Idle_000"]);
            this.sprite.setFrameDirection(1);
            this.sprite.framerate = 2;
            this.posTarget = _position;
            this.chooseTargetPosition();
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
            switch (this.job) {
                case JOB.PATROL:
                    if (this.mtxLocal.translation.equals(this.posTarget, 0.1))
                        // this.chooseTargetPosition();
                        this.job = JOB.IDLE;
                    this.moveEnemy();
                    break;
                case JOB.IDLE:
                default:
                    break;
            }
            this.displayAnimation();
        }
        rotateEnemy(_avatarTranslation) {
            this.cmpTransform.showTo(_avatarTranslation);
        }
        moveEnemy() {
            this.mtxLocal.showTo(this.posTarget);
            this.mtxLocal.translateZ(this.speed * fc.Loop.timeFrameGame / 1000);
        }
        displayAnimation() {
            this.show.mtxLocal.showTo(fc.Vector3.TRANSFORMATION(L13_Doom_State_Machine.avatar.mtxLocal.translation, this.mtxWorldInverse, true));
            let rotation = this.show.mtxLocal.rotation.y;
            rotation = (rotation + 360 + 22.5) % 360;
            rotation = Math.floor(rotation / 45);
            if (this.angleView == rotation)
                return;
            this.angleView = rotation;
            if (rotation > 4) {
                rotation = 8 - rotation;
                this.flip(true);
            }
            else
                this.flip(false);
            let section = ANGLE[rotation]; // .padStart(3, "0");
            console.log(section);
            this.sprite.setAnimation(Enemy.animations["Idle" + section]);
        }
        chooseTargetPosition() {
            let range = 5; //sizeWall * numWalls / 2 - 2;
            this.posTarget = new fc.Vector3(fc.Random.default.getRange(-range, range), 0, fc.Random.default.getRange(-range, range));
            console.log("New target", this.posTarget.toString());
        }
        flip(_reverse) {
            this.sprite.mtxLocal.rotation = fc.Vector3.Y(_reverse ? 180 : 0);
        }
    }
    L13_Doom_State_Machine.Enemy = Enemy;
})(L13_Doom_State_Machine || (L13_Doom_State_Machine = {}));
//# sourceMappingURL=Enemy.js.map