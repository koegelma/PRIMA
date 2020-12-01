namespace L12_Doom_Enemy_Sprites {
  import fc = FudgeCore;
  import fcaid = FudgeAid;


  export enum ANGLE {
    // N = 0, NE = 1, E = 2, SE = 3, S = 4, SW = 5, W = 6, NW = 7,
    _000 = 0, _045 = 1, _090 = 2, _135 = 3, _180 = 4, _225 = 5, _270 = 6, _315 = 7
  }

  export class Enemy extends fc.Node {
    private static animations: fcaid.SpriteSheetAnimations;
    public speed: number = 1;
    private show: fc.Node;
    private sprite: fcaid.NodeSprite;
    private posTarget: fc.Vector3;

    constructor(_name: string = "Enemy", _position: fc.Vector3) {
      super(_name);
      this.addComponent(new fc.ComponentTransform());
      this.mtxLocal.translation = _position;

      this.show = new fcaid.Node("Show", fc.Matrix4x4.IDENTITY());
      this.appendChild(this.show);

      this.sprite = new fcaid.NodeSprite("Sprite");
      this.show.appendChild(this.sprite);


      this.sprite.setAnimation(<fcaid.SpriteSheetAnimation>Enemy.animations["Idle_000"]);
      this.sprite.setFrameDirection(1);
      this.sprite.framerate = 2;

      this.posTarget = _position;

    }

    public static generateSprites(_spritesheet: fc.CoatTextured): void {
      Enemy.animations = {};
      for (let angle: number = 0; angle < 5; angle++) {
        let name: string = "Idle" + ANGLE[angle];
        let sprite: fcaid.SpriteSheetAnimation = new fcaid.SpriteSheetAnimation(name, _spritesheet);
        sprite.generateByGrid(fc.Rectangle.GET(44, 33, 63, 66), 3, 32, fc.ORIGIN2D.BOTTOMCENTER, fc.Vector2.Y(100));
        Enemy.animations[name] = sprite;
      }
    }

    public getZAngle(_angleEnemy: fc.Vector3, _angleAvatar: fc.Vector3): void {
      // 1. Skalarprodukt

      let u: fc.Vector3 = fc.Vector3.Z(_angleEnemy.z);
      let v: fc.Vector3 = fc.Vector3.Z(_angleAvatar.z);

      console.log("Z: " + _angleEnemy.z);

      //let dotProduct: number = fc.Vector3.DOT(u, v);
      //console.log("Dot Product: " + dotProduct);

      // 2. Längen der Vektoren

      // 3. einsetzen

      //let amount: number = Math.sqrt(Math.(_vector.x, 2) + Math.pow(_vector.z, 2));

      // 4. ausrechnen
    }

    public hndEnemy(): void {

      if (this.mtxLocal.translation.equals(this.posTarget, 0.1))
        this.chooseTargetPosition();

      this.moveEnemy();
    }

    public rotateEnemy(_avatarTranslation: fc.Vector3): void {
      this.cmpTransform.showTo(_avatarTranslation);
    }

    public moveEnemy(): void {

      //this.rotateEnemy(_avatarTranslation);
      this.mtxLocal.showTo(this.posTarget);
      this.mtxLocal.translateZ(this.speed * fc.Loop.timeFrameGame / 1000);
      this.show.mtxLocal.showTo(fc.Vector3.TRANSFORMATION(avatar.mtxLocal.translation, this.mtxWorldInverse, true));

      this.mtxLocal.translateZ(0.06);
    }

    private chooseTargetPosition(): void {
      let range: number = 5; //sizeWall * numWalls / 2 - 2;
      this.posTarget = new fc.Vector3(fc.Random.default.getRange(-range, range), 0, fc.Random.default.getRange(-range, range));
      console.log("New target", this.posTarget.toString());
    }
  }
}