namespace L06_BreakOut_Control {
  import ƒ = FudgeCore;

  window.addEventListener("load", hndLoad);
  // window.addEventListener("click", sceneLoad);
  let ball: Moveable;
  let walls: ƒ.Node;
  let paddle: Moveable;
  let bricks: ƒ.Node;
  export let viewport: ƒ.Viewport; 
  let root: ƒ.Node;

  let control: ƒ.Control = new ƒ.Control("PaddleControl", 20, ƒ.CONTROL_TYPE.PROPORTIONAL);
  control.setDelay(80);

  function hndLoad(_event: Event): void {

    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    // ƒ.Debug.log(canvas);

    root = new ƒ.Node("Root");

    ball = new Moveable("Ball", new ƒ.Vector2(0, 0), new ƒ.Vector2(0.5, 0.5));
    root.addChild(ball);

    paddle = new Moveable("Paddle", new ƒ.Vector2(0, -10), new ƒ.Vector2(5, 0.5));
    root.addChild(paddle);

    walls = new ƒ.Node("Walls");
    root.addChild(walls);

    bricks = setupBricks(40);
    root.addChild(bricks);

    walls.addChild(new GameObject("WallLeft", new ƒ.Vector2(-21, 0), new ƒ.Vector2(1, 28)));
    walls.addChild(new GameObject("WallRight", new ƒ.Vector2(21, 0), new ƒ.Vector2(1, 28)));
    walls.addChild(new GameObject("WallTop", new ƒ.Vector2(0, 14), new ƒ.Vector2(43, 1)));
    //walls.addChild(new GameObject("WallBottom", new ƒ.Vector2(0, -14), new ƒ.Vector2(43, 1)));

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(40);
    cmpCamera.pivot.rotateY(180);

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, hndLoop);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 30);
  }

  function hndLoop(_event: Event): void {
    ball.move();
    viewport.draw();

    setupControlBorders();

    paddle.velocity = ƒ.Vector3.X(control.getOutput());
    paddle.move();

    hndCollision();

    checkPosition();
  }

  function hndCollision(): void {
    for (let wall of walls.getChildren())
      ball.checkCollision(<GameObject>wall);

    ball.checkCollisionPaddle(paddle);

    for (let brick of bricks.getChildren() as GameObject[]) {
      if (ball.checkCollision(brick))
        bricks.removeChild(brick);
    }
  }

  function setupControlBorders(): void {
    if (paddle.mtxLocal.translation.x < -17) {
      control.setInput(
        ƒ.Keyboard.mapToValue(-0, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])
        + ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])
      );
    } else if (paddle.mtxLocal.translation.x > 17) {
      control.setInput(
        ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])
        + ƒ.Keyboard.mapToValue(0, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])
      );
    } else {
      control.setInput(
        ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])
        + ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])
      );
    }
  }

  function checkPosition(): void {
    if (ball.mtxLocal.translation.y <= -14) {
      console.log("Game Over!");
      ball.velocity = new ƒ.Vector3(0, 0, 0);
    }
  }
  function setupBricks(_amount: number): ƒ.Node {
    let bricks: ƒ.Node = new ƒ.Node("Bricks");
    let x: number = -15;
    let y: number = 10;
    for (let i: number = 0; i < _amount; i++) {
      if (x > 15) {
        x = -15;
        y -= 2;
      }
      bricks.addChild(new GameObject(`Brick-${i}`, new ƒ.Vector2(x, y), new ƒ.Vector2(3, 0.5)));
      x += 4;
    }
    return bricks;
  }
}