"use strict";
var L13_Doom_State_Machine;
(function (L13_Doom_State_Machine) {
    var fc = FudgeCore;
    class Wall extends L13_Doom_State_Machine.GameObject {
        // private static readonly meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad();
        constructor(_size, _position, _rotation, _material) {
            super("Wall", _size, _position, _rotation);
            // let floor: ƒaid.Node = new ƒaid.Node("Floor", ƒ.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
            let cmpMaterial = new fc.ComponentMaterial(_material);
            cmpMaterial.pivot.scale(fc.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
    }
    L13_Doom_State_Machine.Wall = Wall;
})(L13_Doom_State_Machine || (L13_Doom_State_Machine = {}));
//# sourceMappingURL=Wall.js.map