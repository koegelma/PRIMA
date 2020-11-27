namespace L11_Doom_Enemy {
  import fc = FudgeCore;

  export class GameObject extends fc.Node {
    private static readonly meshQuad: fc.MeshQuad = new fc.MeshQuad();

    public constructor(_name: string, _size: fc.Vector2, _position: fc.Vector3, _rotation: fc.Vector3) {
      super(_name);
      this.addComponent(new fc.ComponentTransform(fc.Matrix4x4.TRANSLATION(_position)));
      this.mtxLocal.rotation = _rotation;

      let cmpQuad: fc.ComponentMesh = new fc.ComponentMesh(GameObject.meshQuad);
      this.addComponent(cmpQuad);
      cmpQuad.pivot.scale(_size.toVector3(1));
    }

    public calculateBounce(_posWith: fc.Vector3, _radius: number = 1): fc.Vector3 {
      let normal: fc.Vector3 = this.mtxWorld.getZ();
      let posThis: fc.Vector3 = this.mtxWorld.translation;

      let difference: fc.Vector3 = fc.Vector3.DIFFERENCE(_posWith, posThis);
      let distance: number = fc.Vector3.DOT(difference, normal);

      if (distance < 0 || distance > _radius)
        return null;

      let size: fc.Vector3 = this.getComponent(fc.ComponentMesh).pivot.scaling;
      let ray: fc.Ray = new fc.Ray(normal, _posWith);
      let intersect: fc.Vector3 = ray.intersectPlane(posThis, normal);

      let localIntersect: fc.Vector3 = fc.Vector3.TRANSFORMATION(intersect, this.mtxWorldInverse, true);

      if (Math.abs(localIntersect.x) - _radius > 0.5 * size.x)
        return null;

      normal.scale(1.001);
      return fc.Vector3.SUM(intersect, normal);
    }

    /* public isTargetbetween(_target: Node, _betweenTarget: GameObject): boolean {

      let posThis: fc.Vector3 = this.mtxWorld.translation;
      let posTarget: fc.Vector3 = _target.mtxWorld.translation;
      let posWith: fc.Vector3 = _betweenTarget.mtxWorld.translation;

      if (this.vectorAmountAirline(fc.Vector3.DIFFERENCE(posWith, posThis)) > this.vectorAmountAirline(fc.Vector3.DIFFERENCE(posTarget, posThis)))
        return false;

      let localWich: fc.Vector3 = fc.Vector3.TRANSFORMATION(posWith, this.mtxWorldInverse, true);
      if (localWich.z < 0)
        return false;
        
      //let normal: fc.Vector3 = this.mtxWorld.getZ();
      let normalBe: fc.Vector3 = _betweenTarget.mtxWorld.getZ();
      let sizeBe: fc.Vector3 = _betweenTarget.getComponent(fc.ComponentMesh).pivot.scaling;

      let ray: fc.Ray = new fc.Ray(this.mtxWorld.getZ(), posTarget);

      let intersect: fc.Vector3 = ray.intersectPlane(posWith, normalBe);
      let localIntersect: fc.Vector3 = fc.Vector3.TRANSFORMATION(intersect, _betweenTarget.mtxWorldInverse, true);

      if (Math.abs(localIntersect.x) > 0.5 * sizeBe.x) {

        return false;

      }
      return true;
    }

    public vectorAmountAirline(_vector: fc.Vector3): number {
      return Math.sqrt(Math.pow(_vector.x, 2) + Math.pow(_vector.z, 2));
    } */
  }
}