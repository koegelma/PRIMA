"use strict";
var L10_Doom_Mouse;
(function (L10_Doom_Mouse) {
    var fc = FudgeCore;
    class GameObject extends fc.Node {
        constructor(_name, _size, _position, _rotation) {
            super(_name);
            this.addComponent(new fc.ComponentTransform(fc.Matrix4x4.TRANSLATION(_position)));
            this.mtxLocal.rotation = _rotation;
            let cmpQuad = new fc.ComponentMesh(GameObject.meshQuad);
            this.addComponent(cmpQuad);
            cmpQuad.pivot.scale(_size.toVector3(1));
        }
        calculateBounce(_posWith, _radius = 1) {
            let normal = this.mtxWorld.getZ();
            let posThis = this.mtxWorld.translation;
            let difference = fc.Vector3.DIFFERENCE(_posWith, posThis);
            let distance = fc.Vector3.DOT(difference, normal);
            if (distance < 0 || distance > _radius)
                return null;
            let size = this.getComponent(fc.ComponentMesh).pivot.scaling;
            let ray = new fc.Ray(normal, _posWith);
            let intersect = ray.intersectPlane(posThis, normal);
            let localIntersect = fc.Vector3.TRANSFORMATION(intersect, this.mtxWorldInverse, true);
            if (Math.abs(localIntersect.x) - _radius > 0.5 * size.x)
                return null;
            normal.scale(1.001);
            return fc.Vector3.SUM(intersect, normal);
        }
    }
    GameObject.meshQuad = new fc.MeshQuad();
    L10_Doom_Mouse.GameObject = GameObject;
})(L10_Doom_Mouse || (L10_Doom_Mouse = {}));
//# sourceMappingURL=GameObject.js.map