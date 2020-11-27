"use strict";
var L12_Doom_Enemy_Sprites;
(function (L12_Doom_Enemy_Sprites) {
    var fc = FudgeCore;
    class Wall extends L12_Doom_Enemy_Sprites.GameObject {
        // private static readonly meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad();
        constructor(_size, _position, _rotation, _material) {
            super("Wall", _size, _position, _rotation);
            // let floor: ƒaid.Node = new ƒaid.Node("Floor", ƒ.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
            let cmpMaterial = new fc.ComponentMaterial(_material);
            cmpMaterial.pivot.scale(fc.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
    }
    L12_Doom_Enemy_Sprites.Wall = Wall;
})(L12_Doom_Enemy_Sprites || (L12_Doom_Enemy_Sprites = {}));
//# sourceMappingURL=Wall.js.map