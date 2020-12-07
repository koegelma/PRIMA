namespace L13_Doom_State_Machine {
  import fc = FudgeCore;
  import fcaid = FudgeAid;


  export enum ANGLE {
    // N = 0, NE = 1, E = 2, SE = 3, S = 4, SW = 5, W = 6, NW = 7,
    _000 = 0, _045 = 1, _090 = 2, _135 = 3, _180 = 4, _225 = 5, _270 = 6, _315 = 7
  }

  export enum JOB {
    IDLE, PATROL
  }

  export class Enemy extends fc.Node {
    private static animations: fcaid.SpriteSheetAnimations;
    public speed: number = 3;
    private show: fc.Node;
    private sprite: fcaid.NodeSprite;
    private posTarget: fc.Vector3;
    private angleView: number = 0;
    private job: JOB = JOB.PATROL;

    constructor(_name: string = "Enemy", _position: fc.Vector3) {
      super(_name);
      this.addComponent(new fc.ComponentTransform());
      this.mtxLocal.translation = _position;

      this.show = new fcaid.Node("Show", fc.Matrix4x4.IDENTITY());
      this.appendChild(this.show);

      this.sprite = new fcaid.NodeSprite("Sprite");
      this.sprite.addComponent(new fc.ComponentTransform());
      this.show.appendChild(this.sprite);


      this.sprite.setAnimation(<fcaid.SpriteSheetAnimation>Enemy.animations["Idle_000"]);
      this.sprite.setFrameDirection(1);
      this.sprite.framerate = 2;

      this.posTarget = _position;
      this.chooseTargetPosition();

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



    public hndEnemy(): void {

      switch (this.job) {
        case JOB.PATROL:
          if (this.mtxLocal.translation.equals(this.posTarget, 0.1))
            // this.chooseTargetPosition();
            this.job = JOB.IDLE;
          this.moveEnemy();
          break;
        case JOB.IDLE:
        default:
          break;
      }


      this.displayAnimation();
    }

    public rotateEnemy(_avatarTranslation: fc.Vector3): void {
      this.cmpTransform.showTo(_avatarTranslation);
    }

    public moveEnemy(): void {

      this.mtxLocal.showTo(this.posTarget);
      this.mtxLocal.translateZ(this.speed * fc.Loop.timeFrameGame / 1000);
    }

    private displayAnimation(): void {
      this.show.mtxLocal.showTo(fc.Vector3.TRANSFORMATION(avatar.mtxLocal.translation, this.mtxWorldInverse, true));

      let rotation: number = this.show.mtxLocal.rotation.y;
      rotation = (rotation + 360 + 22.5) % 360;
      rotation = Math.floor(rotation / 45);

      if (this.angleView == rotation)
        return;

      this.angleView = rotation;

      if (rotation > 4) {
        rotation = 8 - rotation;
        this.flip(true);
      }
      else
        this.flip(false);

      let section: string = ANGLE[rotation]; // .padStart(3, "0");
      console.log(section);
      this.sprite.setAnimation(<fcaid.SpriteSheetAnimation>Enemy.animations["Idle" + section]);
    }

    private chooseTargetPosition(): void {
      let range: number = 5; //sizeWall * numWalls / 2 - 2;
      this.posTarget = new fc.Vector3(fc.Random.default.getRange(-range, range), 0, fc.Random.default.getRange(-range, range));
      console.log("New target", this.posTarget.toString());
    }

    private flip(_reverse: boolean): void {
      this.sprite.mtxLocal.rotation = fc.Vector3.Y(_reverse ? 180 : 0);
    }
  }
}