namespace L05_BreakOut_Bricks {

  import ƒ = FudgeCore;

  window.addEventListener("load", hndLoad);
  // window.addEventListener("click", sceneLoad);
  let ball: Moveable;
  let walls: ƒ.Node;
  let paddle: GameObject;
  export let viewport: ƒ.Viewport;
  let root: ƒ.Node;

  let bricks: GameObject[] = new Array(50);

  function hndLoad(_event: Event): void {

    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    // ƒ.Debug.log(canvas);

    root = new ƒ.Node("Root");

    ball = new Moveable("Ball", new ƒ.Vector2(0, 0), new ƒ.Vector2(1, 1));
    root.addChild(ball);

    walls = new ƒ.Node("Walls");
    root.addChild(walls);

    walls.addChild(new GameObject("WallLeft", new ƒ.Vector2(-21, 0), new ƒ.Vector2(1, 28)));
    walls.addChild(new GameObject("WallRight", new ƒ.Vector2(21, 0), new ƒ.Vector2(1, 28)));
    walls.addChild(new GameObject("WallTop", new ƒ.Vector2(0, 14), new ƒ.Vector2(43, 1)));
    walls.addChild(new GameObject("WallBottom", new ƒ.Vector2(0, -14), new ƒ.Vector2(43, 1)));

    paddle = new GameObject("Paddle", new ƒ.Vector2(0, -12), new ƒ.Vector2(5, 0.5));
    root.addChild(paddle);

    setupBricks();

    /* brick = new GameObject("Brick", new ƒ.Vector2(-18, 12), new ƒ.Vector2(3, 0.5));
    root.addChild(brick); */

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(40);
    cmpCamera.pivot.rotateY(180);

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    // ƒ.Debug.log(viewport);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, hndLoop);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 144);
  }

  function hndLoop(_event: Event): void {
    document.addEventListener("keydown", hndInput);
    ball.move();
    viewport.draw();

    hndCollision();
  }

  function hndInput(_event: KeyboardEvent): void {

    switch (_event.code) {
      case ƒ.KEYBOARD_CODE.ARROW_LEFT:
        paddle.mtxLocal.translateX(-1);
        paddle.rect.position.x -= 1;
        break;
      case ƒ.KEYBOARD_CODE.ARROW_RIGHT:
        paddle.mtxLocal.translateX(1);
        paddle.rect.position.x += 1;
        break;
    }

    /* if (_event.code == ƒ.KEYBOARD_CODE.ARROW_LEFT) {
      paddle.mtxLocal.translateX(-1);
      paddle.rect.position.x -= 1;
    }
    else if (_event.code == ƒ.KEYBOARD_CODE.ARROW_RIGHT) {
      paddle.mtxLocal.translateX(1);
      paddle.rect.position.x += 1;
    } */
  }

  function hndCollision(): void {

    for (let wall of walls.getChildren()) {
      ball.checkCollision(<GameObject>wall);
    }
    ball.checkCollision(<GameObject>paddle);
    for (var brick in bricks) {
      ball.checkCollision(<GameObject>bricks[brick]);
      //bricks[brick].cmpTransform.local.translate(new ƒ.Vector3(-50, 0, 0));
    }
  }

  function setupBricks(): void {

    for (let row: number = 1; row < 6; row++) {
      for (let col: number = 1; col < 38; col += 4) {
        bricks[row + col] = new GameObject("Brick" + row + col, new ƒ.Vector2(-19 + col, 13 - row), new ƒ.Vector2(3, 0.5));
        root.addChild(bricks[row + col]);
      }
    }
  }
}