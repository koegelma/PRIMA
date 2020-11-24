"use strict";
var L11_Doom_Enemy;
(function (L11_Doom_Enemy) {
    var fc = FudgeCore;
    class Enemy extends L11_Doom_Enemy.GameObject {
        // private static readonly meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad();
        constructor(_name, _size, _position, _rotation, _material) {
            super("Enemy", _size, _position, _rotation);
            let cmpMaterial = new fc.ComponentMaterial(_material);
            cmpMaterial.pivot.scale(fc.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
        rotateEnemy(_avatarTranslation) {
            this.cmpTransform.showTo(_avatarTranslation);
        }
    }
    L11_Doom_Enemy.Enemy = Enemy;
})(L11_Doom_Enemy || (L11_Doom_Enemy = {}));
//# sourceMappingURL=Enemy.js.map