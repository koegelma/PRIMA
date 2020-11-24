"use strict";
var L10_Doom_Mouse;
(function (L10_Doom_Mouse) {
    var fc = FudgeCore;
    class Enemy extends L10_Doom_Mouse.GameObject {
        // private static readonly meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad();
        constructor(_size, _position, _rotation, _material) {
            super("Enemy", _size, _position, _rotation);
            // let floor: ƒaid.Node = new ƒaid.Node("Floor", ƒ.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
            let cmpMaterial = new fc.ComponentMaterial(_material);
            cmpMaterial.pivot.scale(fc.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
    }
    L10_Doom_Mouse.Enemy = Enemy;
})(L10_Doom_Mouse || (L10_Doom_Mouse = {}));
//# sourceMappingURL=Enemy.js.map