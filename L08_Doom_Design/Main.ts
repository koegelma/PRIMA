namespace L08_Doom_Design {
  import fc = FudgeCore;
  import fcaid = FudgeAid;

  window.addEventListener("load", hndLoad);

  let cntKeyHorizontal: fc.Control = new fc.Control("Keyboard", 1, fc.CONTROL_TYPE.PROPORTIONAL, true);
  let cntKeyVertical: fc.Control = new fc.Control("Keyboard", 4, fc.CONTROL_TYPE.PROPORTIONAL, true);
  let cmpCamera: fc.ComponentCamera;

  let playGroundSize: number = 20;
  let unit: number = 2;
  let avatarVelocity: fc.Vector3;

  export let viewport: fc.Viewport;
  let root: fc.Node;
  let avatar: fc.Node;
  let walls: fc.Node;
  let meshQuad: fc.MeshQuad = new fc.MeshQuad("Quad");


  function hndLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    root = new fc.Node("Root");
    avatar = new fc.Node("Avatar");
    walls = new fc.Node("walls");
    avatar.addComponent(new fc.ComponentTransform());
    root.addChild(avatar);
    root.addChild(walls);
    root.appendChild(createFcaidNode("Floor", "../DoomAssets/DEM1_5.png", fc.Matrix4x4.ROTATION_X(-90), playGroundSize, playGroundSize / unit));


    createArena();

    cmpCamera = new fc.ComponentCamera();

    cmpCamera.pivot.translateY(1.5);
    cmpCamera.pivot.rotateY(180);
    cmpCamera.backgroundColor = fc.Color.CSS("darkblue");
    avatar.addComponent(cmpCamera);
    viewport = new fc.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);

    fc.Loop.addEventListener(fc.EVENT.LOOP_FRAME, hndLoop);
    fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 60);

  }

  // immerwider aufrufende Methode 
  function hndLoop(_event: Event): void {
    hndAvatar();
    viewport.draw();
  }

  // Controls 
  function hndKeyboardControls(): void {
    cntKeyVertical.setInput(
      fc.Keyboard.mapToValue(3, 0, [fc.KEYBOARD_CODE.W, fc.KEYBOARD_CODE.ARROW_UP])
      + fc.Keyboard.mapToValue(-3, 0, [fc.KEYBOARD_CODE.S, fc.KEYBOARD_CODE.ARROW_DOWN])
    );
    cntKeyHorizontal.setInput(
      fc.Keyboard.mapToValue(1.3, 0, [fc.KEYBOARD_CODE.A, fc.KEYBOARD_CODE.ARROW_LEFT])
      + fc.Keyboard.mapToValue(-1.3, 0, [fc.KEYBOARD_CODE.D, fc.KEYBOARD_CODE.ARROW_RIGHT])
    );

    avatarVelocity = fc.Vector3.Z(-cntKeyVertical.getOutput());
    let frameTime: number = fc.Loop.timeFrameGame / 1000;

    let distance: fc.Vector3 = fc.Vector3.SCALE(avatarVelocity, frameTime);
    translate(distance);
    rotate(cntKeyHorizontal.getOutput());
  }

  // For und Zurücklaufen 
  function translate(_distance: fc.Vector3): void {
    avatar.mtxLocal.translate(_distance);
  }

  // drehen 
  function rotate(_degree: number): void {
    avatar.mtxLocal.rotateY(_degree);
  }

  // Objekte aufsellen für vermeideung doppeltem Code
  function createFcaidNode(_name: string, _texture: string, _transforme: fc.Matrix4x4, _size: number, _number: number): fcaid.Node {
    let txtNode: fc.TextureImage = new fc.TextureImage(_texture);
    let mtrNode: fc.Material = new fc.Material("mtr" + _name, fc.ShaderTexture, new fc.CoatTextured(null, txtNode));
    let node: fcaid.Node = new fcaid.Node(_name, _transforme, mtrNode, meshQuad);
    node.mtxLocal.scale(fc.Vector3.ONE(_size));
    node.getComponent(fc.ComponentMaterial).pivot.scale(fc.Vector2.ONE(_number));

    return node;
  }


  // Einfache Arena zum Testen
  function createArena(): void {
    let hight: number = unit / 2;
    let pos: fc.Vector3 = new fc.Vector3(-11, hight, -10);
    let mrt: fc.Matrix4x4;

    for (let i: number = 0; i < playGroundSize / unit; i++) {
      pos.x += unit;
      mrt = fc.Matrix4x4.TRANSLATION(pos);
      walls.appendChild(createFcaidNode(`NWall-${i}`, "../DoomAssets/CEMPOIS.png", mrt, unit, 1));

    }
    pos.x += unit / 2;
    pos.z += unit / 2;
    for (let i: number = 0; i < playGroundSize / unit; i++) {

      mrt = fc.Matrix4x4.TRANSLATION(pos);
      mrt.multiply(fc.Matrix4x4.ROTATION_Y(-90));
      walls.appendChild(createFcaidNode(`EWall-${i}`, "../DoomAssets/CEMPOIS.png", mrt, unit, 1));
      pos.z += unit;
    }
    pos.x -= unit / 2;
    pos.z -= unit / 2;
    for (let i: number = 0; i < playGroundSize / unit; i++) {

      mrt = fc.Matrix4x4.TRANSLATION(pos);
      mrt.multiply(fc.Matrix4x4.ROTATION_Y(180));
      walls.appendChild(createFcaidNode(`SWall-${i}`, "../DoomAssets/CEMPOIS.png", mrt, unit, 1));
      pos.x -= unit;
    }
    pos.x += unit / 2;
    pos.z -= unit / 2;
    for (let i: number = 0; i < playGroundSize / unit; i++) {

      mrt = fc.Matrix4x4.TRANSLATION(pos);
      mrt.multiply(fc.Matrix4x4.ROTATION_Y(90));
      walls.appendChild(createFcaidNode(`WWall-${i}`, "../DoomAssets/CEMPOIS.png", mrt, unit, 1));
      pos.z -= unit;
    }


  }

  function hndAvatar(): void {

    let tempPos: fc.Vector3 = avatar.mtxLocal.translation;

    hndKeyboardControls();
    for (let wall of walls.getChildren() as fcaid.Node[]) {
      if (checkCollision(wall)) {
        tempPos.x += wall.mtxLocal.getZ().x * 0.001;
        tempPos.z += wall.mtxLocal.getZ().z * 0.001;
        avatar.mtxLocal.translation = tempPos;
      }

    }
  }

  //collision an einer Ebene Der Wand und nicht die Wand selber 
  function checkCollision(_target: fcaid.Node): boolean {

    // fc.Debug.log(_target.mtxWorld.translation);
    // fc.Debug.log(_target.mtxLocal.getZ());
    // fc.Debug.log(avatar.mtxWorld.translation);

    let distance: number = (avatar.mtxWorld.translation.x - _target.mtxWorld.translation.x) * _target.mtxLocal.getZ().x + (avatar.mtxWorld.translation.y - _target.mtxWorld.translation.y) * _target.mtxLocal.getZ().y + (avatar.mtxWorld.translation.z - _target.mtxWorld.translation.z) * _target.mtxLocal.getZ().z;
    //fc.Debug.log(distance);
    if (distance < unit + 0.3) {
      return true;
    }

    return false;
  }
}