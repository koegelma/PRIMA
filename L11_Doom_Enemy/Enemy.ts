namespace L11_Doom_Enemy {
  import fc = FudgeCore;

  export class Enemy extends GameObject {
    // private static readonly meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad();

    public constructor(_name: string,_size: fc.Vector2, _position: fc.Vector3, _rotation: fc.Vector3, _material: fc.Material) {
      super("Enemy", _size, _position, _rotation);

      let cmpMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(_material);
      cmpMaterial.pivot.scale(fc.Vector2.ONE(1));
      this.addComponent(cmpMaterial);
    }

    public rotateEnemy(_avatarTranslation: fc.Vector3): void {
      this.cmpTransform.showTo(_avatarTranslation);
    }
  }
}