namespace L11_Doom_Enemy {
  import fc = FudgeCore;

  export class Enemy extends GameObject {
    
    public constructor(_name: string, _size: fc.Vector2, _position: fc.Vector3, _rotation: fc.Vector3, _material: fc.Material) {
      super("Enemy", _size, _position, _rotation);

      let cmpMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(_material);
      cmpMaterial.pivot.scale(fc.Vector2.ONE(1));
      this.addComponent(cmpMaterial);
    }

    public rotateEnemy(_avatarTranslation: fc.Vector3): void {
      this.cmpTransform.showTo(_avatarTranslation);
    }

    public moveEnemy(_avatarTranslation: fc.Vector3): void {

      this.rotateEnemy(_avatarTranslation);

      let normal: fc.Vector3 = this.mtxWorld.getZ();
      let posThis: fc.Vector3 = this.mtxWorld.translation;
      let difference: fc.Vector3 = fc.Vector3.DIFFERENCE(_avatarTranslation, posThis);
      let distance: number = fc.Vector3.DOT(difference, normal);

      if (distance < 3) {
        this.mtxLocal.translateZ(0);
      }
      else {
        this.mtxLocal.translateZ(0.06);
      }
    }
    
  }
}