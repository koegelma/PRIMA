"use strict";
var L11_Doom_Enemy;
(function (L11_Doom_Enemy) {
    var fc = FudgeCore;
    class Enemy extends L11_Doom_Enemy.GameObject {
        constructor(_name, _size, _position, _rotation, _material) {
            super("Enemy", _size, _position, _rotation);
            let cmpMaterial = new fc.ComponentMaterial(_material);
            cmpMaterial.pivot.scale(fc.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
        rotateEnemy(_avatarTranslation) {
            this.cmpTransform.showTo(_avatarTranslation);
        }
        moveEnemy(_avatarTranslation) {
            this.rotateEnemy(_avatarTranslation);
            let normal = this.mtxWorld.getZ();
            let posThis = this.mtxWorld.translation;
            let difference = fc.Vector3.DIFFERENCE(_avatarTranslation, posThis);
            let distance = fc.Vector3.DOT(difference, normal);
            if (distance < 3) {
                this.mtxLocal.translateZ(0);
            }
            else {
                this.mtxLocal.translateZ(0.06);
            }
        }
    }
    L11_Doom_Enemy.Enemy = Enemy;
})(L11_Doom_Enemy || (L11_Doom_Enemy = {}));
//# sourceMappingURL=Enemy.js.map