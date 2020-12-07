"use strict";
var L14_Doom_UI;
(function (L14_Doom_UI) {
    var fc = FudgeCore;
    class Wall extends L14_Doom_UI.GameObject {
        // private static readonly meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad();
        constructor(_size, _position, _rotation, _material) {
            super("Wall", _size, _position, _rotation);
            // let floor: ƒaid.Node = new ƒaid.Node("Floor", ƒ.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
            let cmpMaterial = new fc.ComponentMaterial(_material);
            cmpMaterial.pivot.scale(fc.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
    }
    L14_Doom_UI.Wall = Wall;
})(L14_Doom_UI || (L14_Doom_UI = {}));
//# sourceMappingURL=Wall.js.map