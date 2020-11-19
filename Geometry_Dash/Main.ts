namespace Geometry_Dash {
  import ƒ = FudgeCore;

  window.addEventListener("load", hndLoad);
  // window.addEventListener("click", sceneLoad);

  let walls: ƒ.Node;
  let player: Moveable;
  export let viewport: ƒ.Viewport;
  let root: ƒ.Node;
  let obstacles: ƒ.Node;
  //let timeCounter: number = 0;

  let control: ƒ.Control = new ƒ.Control("PaddleControl", 20, ƒ.CONTROL_TYPE.PROPORTIONAL);
  control.setDelay(80);

  function hndLoad(_event: Event): void {

    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    // ƒ.Debug.log(canvas);

    root = new ƒ.Node("Root");



    player = new Moveable("Paddle", new ƒ.Vector2(0, -4), new ƒ.Vector2(2, 2));
    root.addChild(player);

    walls = new ƒ.Node("Walls");
    root.addChild(walls);

    


    walls.addChild(new GameObject("WallLeft", new ƒ.Vector2(-21, 0), new ƒ.Vector2(1, 28)));
    walls.addChild(new GameObject("WallRight", new ƒ.Vector2(21, 0), new ƒ.Vector2(1, 28)));
    walls.addChild(new GameObject("WallTop", new ƒ.Vector2(0, 14), new ƒ.Vector2(43, 1)));
    walls.addChild(new GameObject("WallBottom", new ƒ.Vector2(0, -8), new ƒ.Vector2(43, 1)));

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(40);
    cmpCamera.pivot.rotateY(180);

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, hndLoop);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 30);
  }

  function hndLoop(_event: Event): void {

    viewport.draw();

    obstacles = setupObstacles();
    root.addChild(obstacles);
    //timeCounter++;

    setupControlBorders();

    player.velocity = ƒ.Vector3.X(control.getOutput());
    player.move();
  }

  function setupControlBorders(): void {
    if (player.mtxLocal.translation.x < -17) {
      control.setInput(
        ƒ.Keyboard.mapToValue(-0, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])
        + ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])
      );
    } else if (player.mtxLocal.translation.x > 17) {
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
  function setupObstacles(): ƒ.Node {
    let obstacles: ƒ.Node = new ƒ.Node("Obstacles");
    
    for (let i: number = 0; i < 10; i++) {
      let x: number = 20;
      let y: number = ƒ.Random.default.getRange(-8, 8);
      obstacles.addChild(new GameObject(`Obstacle-${i}`, new ƒ.Vector2(x, y), new ƒ.Vector2(1, ƒ.Random.default.getRange(3, 10))));

    }
    return obstacles;
  }
}