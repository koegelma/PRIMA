"use strict";
var L12_Doom_Enemy_Sprites;
(function (L12_Doom_Enemy_Sprites) {
    var fc = FudgeCore;
    var fcaid = FudgeAid;
    window.addEventListener("load", hndLoad);
    L12_Doom_Enemy_Sprites.sizeWall = 3;
    L12_Doom_Enemy_Sprites.numWalls = 20;
    L12_Doom_Enemy_Sprites.avatar = new fc.Node("Avatar");
    let root = new fc.Node("Root");
    let walls;
    let enemies;
    let cmpCamera = new fc.ComponentCamera();
    let ctrSpeed = new fc.Control("AvatarSpeed", 0.5, 0 /* PROPORTIONAL */);
    ctrSpeed.setDelay(100);
    let ctrDirection = new fc.Control("AvatarSpeed", 0.5, 0 /* PROPORTIONAL */);
    ctrDirection.setDelay(100);
    let ctrRotation = new fc.Control("AvatarRotation", -0.1, 0 /* PROPORTIONAL */);
    ctrRotation.setDelay(50);
    async function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        let meshQuad = new fc.MeshQuad("Quad");
        let txtFloor = new fc.TextureImage("../DoomAssets/DEM1_5.png");
        let mtrFloor = new fc.Material("Floor", fc.ShaderTexture, new fc.CoatTextured(null, txtFloor));
        let floor = new fcaid.Node("Floor", fc.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
        floor.mtxLocal.scale(fc.Vector3.ONE(L12_Doom_Enemy_Sprites.sizeWall * L12_Doom_Enemy_Sprites.numWalls));
        floor.getComponent(fc.ComponentMaterial).pivot.scale(fc.Vector2.ONE(L12_Doom_Enemy_Sprites.numWalls));
        root.appendChild(floor);
        walls = createWalls();
        root.appendChild(walls);
        enemies = await createEnemies();
        root.appendChild(enemies);
        cmpCamera.projectCentral(1, 45, fc.FIELD_OF_VIEW.DIAGONAL, 0.2, 10000);
        cmpCamera.pivot.translate(fc.Vector3.Y(1.7));
        cmpCamera.backgroundColor = fc.Color.CSS("black");
        L12_Doom_Enemy_Sprites.avatar.addComponent(cmpCamera);
        L12_Doom_Enemy_Sprites.avatar.addComponent(new fc.ComponentTransform());
        L12_Doom_Enemy_Sprites.avatar.mtxLocal.translate(fc.Vector3.Z(10));
        L12_Doom_Enemy_Sprites.avatar.mtxLocal.rotate(fc.Vector3.Y(180));
        root.appendChild(L12_Doom_Enemy_Sprites.avatar);
        L12_Doom_Enemy_Sprites.viewport = new fc.Viewport();
        L12_Doom_Enemy_Sprites.viewport.initialize("Viewport", root, cmpCamera, canvas);
        L12_Doom_Enemy_Sprites.viewport.draw();
        canvas.addEventListener("mousemove", hndMouse);
        canvas.addEventListener("click", canvas.requestPointerLock);
        fc.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 120);
    }
    function hndLoop(_event) {
        // hndEnemy();
        moveAvatar(ctrSpeed.getOutput(), ctrDirection.getOutput(), ctrRotation.getOutput());
        ctrRotation.setInput(0);
        for (let enemy of enemies.getChildren())
            enemy.hndEnemy();
        L12_Doom_Enemy_Sprites.viewport.draw();
    }
    function hndMouse(_event) {
        ctrRotation.setInput(_event.movementX);
    }
    function moveAvatar(_translationZ, _translationX, _rotation) {
        ctrSpeed.setInput(fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.S, fc.KEYBOARD_CODE.ARROW_DOWN])
            + fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.W, fc.KEYBOARD_CODE.ARROW_UP]));
        ctrDirection.setInput(fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.A, fc.KEYBOARD_CODE.ARROW_LEFT])
            + fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.D, fc.KEYBOARD_CODE.ARROW_RIGHT]));
        let speedRotation = _rotation * 0.6;
        L12_Doom_Enemy_Sprites.avatar.mtxLocal.rotateY(speedRotation);
        let posOld = L12_Doom_Enemy_Sprites.avatar.mtxLocal.translation;
        let speedZ = _translationZ * 0.3;
        L12_Doom_Enemy_Sprites.avatar.mtxLocal.translateZ(speedZ);
        let speedX = _translationX * 0.2;
        L12_Doom_Enemy_Sprites.avatar.mtxLocal.translateX(speedX);
        let bouncedOff = bounceOffWalls(walls.getChildren());
        if (bouncedOff.length < 2)
            return;
        bouncedOff = bounceOffWalls(bouncedOff);
        if (bouncedOff.length == 0)
            return;
        console.log("Stuck!");
        L12_Doom_Enemy_Sprites.avatar.mtxLocal.translation = posOld;
    }
    function bounceOffWalls(_walls) {
        let bouncedOff = [];
        let posAvatar = L12_Doom_Enemy_Sprites.avatar.mtxLocal.translation;
        for (let wall of _walls) {
            let posBounce = wall.calculateBounce(posAvatar, 1);
            if (posBounce) {
                L12_Doom_Enemy_Sprites.avatar.mtxLocal.translation = posBounce;
                bouncedOff.push(wall);
            }
        }
        return bouncedOff;
    }
    function createWalls() {
        let walls = new fc.Node("Walls");
        let txtWall = new fc.TextureImage("../DoomAssets/CEMPOIS.png");
        let mtrWall = new fc.Material("Wall", fc.ShaderTexture, new fc.CoatTextured(null, txtWall));
        walls.appendChild(new L12_Doom_Enemy_Sprites.Wall(fc.Vector2.ONE(3), fc.Vector3.Y(L12_Doom_Enemy_Sprites.sizeWall / 2), fc.Vector3.ZERO(), mtrWall));
        walls.appendChild(new L12_Doom_Enemy_Sprites.Wall(fc.Vector2.ONE(3), fc.Vector3.Y(L12_Doom_Enemy_Sprites.sizeWall / 2), fc.Vector3.Y(180), mtrWall));
        for (let i = -L12_Doom_Enemy_Sprites.numWalls / 2 + 0.5; i < L12_Doom_Enemy_Sprites.numWalls / 2; i++) {
            walls.appendChild(new L12_Doom_Enemy_Sprites.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-L12_Doom_Enemy_Sprites.numWalls / 2, 0.5, i), L12_Doom_Enemy_Sprites.sizeWall), fc.Vector3.Y(90), mtrWall));
            // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
            walls.appendChild(new L12_Doom_Enemy_Sprites.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(L12_Doom_Enemy_Sprites.numWalls / 2, 0.5, i), L12_Doom_Enemy_Sprites.sizeWall), fc.Vector3.Y(-90), mtrWall));
            // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
            walls.appendChild(new L12_Doom_Enemy_Sprites.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(i, 0.5, -L12_Doom_Enemy_Sprites.numWalls / 2), L12_Doom_Enemy_Sprites.sizeWall), fc.Vector3.Y(0), mtrWall));
            // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
            walls.appendChild(new L12_Doom_Enemy_Sprites.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(i, 0.5, L12_Doom_Enemy_Sprites.numWalls / 2), L12_Doom_Enemy_Sprites.sizeWall), fc.Vector3.Y(180), mtrWall));
        }
        return walls;
    }
    /* function hndEnemy(): void {
  
      enemy.moveEnemy(avatar.mtxLocal.translation);
  
    }
   */
    async function createEnemies() {
        let enemies = new fc.Node("Enemies");
        let txtCacodemon = new fc.TextureImage();
        await txtCacodemon.load("../DoomAssets/Cacodemon.png");
        let coatSprite = new fc.CoatTextured(null, txtCacodemon);
        L12_Doom_Enemy_Sprites.Enemy.generateSprites(coatSprite);
        enemies.appendChild(new L12_Doom_Enemy_Sprites.Enemy("Cacodemon0", fc.Vector3.Z(3)));
        enemies.appendChild(new L12_Doom_Enemy_Sprites.Enemy("Cacodemon1", fc.Vector3.X(3)));
        enemies.appendChild(new L12_Doom_Enemy_Sprites.Enemy("Cacodemon2", fc.Vector3.X(-3)));
        console.log("Enemies", enemies);
        return enemies;
    }
})(L12_Doom_Enemy_Sprites || (L12_Doom_Enemy_Sprites = {}));
//# sourceMappingURL=Main.js.map