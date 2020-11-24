"use strict";
var L11_Doom_Enemy;
(function (L11_Doom_Enemy) {
    var fc = FudgeCore;
    var fcaid = FudgeAid;
    window.addEventListener("load", hndLoad);
    const sizeWall = 3;
    const numWalls = 20;
    const sizeEnemies = 2;
    let root = new fc.Node("Root");
    let avatar = new fc.Node("Avatar");
    let walls;
    let enemy;
    let cmpCamera = new fc.ComponentCamera();
    let ctrSpeed = new fc.Control("AvatarSpeed", 0.5, 0 /* PROPORTIONAL */);
    ctrSpeed.setDelay(100);
    let ctrDirection = new fc.Control("AvatarSpeed", 0.5, 0 /* PROPORTIONAL */);
    ctrDirection.setDelay(100);
    let ctrRotation = new fc.Control("AvatarRotation", -0.1, 0 /* PROPORTIONAL */);
    ctrRotation.setDelay(50);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        let meshQuad = new fc.MeshQuad("Quad");
        let txtFloor = new fc.TextureImage("../DoomAssets/DEM1_5.png");
        let mtrFloor = new fc.Material("Floor", fc.ShaderTexture, new fc.CoatTextured(null, txtFloor));
        let floor = new fcaid.Node("Floor", fc.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
        floor.mtxLocal.scale(fc.Vector3.ONE(sizeWall * numWalls));
        floor.getComponent(fc.ComponentMaterial).pivot.scale(fc.Vector2.ONE(numWalls));
        root.appendChild(floor);
        walls = createWalls();
        root.appendChild(walls);
        let txtEnemy = new fc.TextureImage("../DoomAssets/Annihilator.png");
        let mtrEnemy = new fc.Material("Enemy", fc.ShaderTexture, new fc.CoatTextured(null, txtEnemy));
        //let enemy: fc.Node = new fc.Node("Enemy");
        //enemy.appendChild(new Enemy(fc.Vector2.ONE(4), new fc.Vector3(5, sizeEnemies / 1.5, 0), new fc.Vector3(0, 0, 0), mtrEnemy));
        //enemy = createEnemy();
        enemy = new L11_Doom_Enemy.Enemy("Enemy", fc.Vector2.ONE(4), new fc.Vector3(5, sizeEnemies / 1.5, 0), new fc.Vector3(0, 0, 0), mtrEnemy);
        root.appendChild(enemy);
        cmpCamera.projectCentral(1, 45, fc.FIELD_OF_VIEW.DIAGONAL, 0.2, 10000);
        cmpCamera.pivot.translate(fc.Vector3.Y(1.7));
        cmpCamera.backgroundColor = fc.Color.CSS("black");
        avatar.addComponent(cmpCamera);
        avatar.addComponent(new fc.ComponentTransform());
        avatar.mtxLocal.translate(fc.Vector3.Z(10));
        avatar.mtxLocal.rotate(fc.Vector3.Y(180));
        root.appendChild(avatar);
        L11_Doom_Enemy.viewport = new fc.Viewport();
        L11_Doom_Enemy.viewport.initialize("Viewport", root, cmpCamera, canvas);
        L11_Doom_Enemy.viewport.draw();
        canvas.addEventListener("mousemove", hndMouse);
        canvas.addEventListener("click", canvas.requestPointerLock);
        fc.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 120);
    }
    function hndLoop(_event) {
        ctrSpeed.setInput(fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.S, fc.KEYBOARD_CODE.ARROW_DOWN])
            + fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.W, fc.KEYBOARD_CODE.ARROW_UP]));
        ctrDirection.setInput(fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.A, fc.KEYBOARD_CODE.ARROW_LEFT])
            + fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.D, fc.KEYBOARD_CODE.ARROW_RIGHT]));
        enemy.rotateEnemy(avatar.mtxLocal.translation);
        moveAvatar(ctrSpeed.getOutput(), ctrDirection.getOutput(), ctrRotation.getOutput());
        ctrRotation.setInput(0);
        L11_Doom_Enemy.viewport.draw();
    }
    function hndMouse(_event) {
        ctrRotation.setInput(_event.movementX);
    }
    function moveAvatar(_translationZ, _translationX, _rotation) {
        let speedRotation = _rotation * 0.6;
        avatar.mtxLocal.rotateY(speedRotation);
        let posOld = avatar.mtxLocal.translation;
        let speedZ = _translationZ * 0.3;
        avatar.mtxLocal.translateZ(speedZ);
        let speedX = _translationX * 0.15;
        avatar.mtxLocal.translateX(speedX);
        let bouncedOff = bounceOffWalls(walls.getChildren());
        if (bouncedOff.length < 2)
            return;
        bouncedOff = bounceOffWalls(bouncedOff);
        if (bouncedOff.length == 0)
            return;
        console.log("Stuck!");
        avatar.mtxLocal.translation = posOld;
    }
    function bounceOffWalls(_walls) {
        let bouncedOff = [];
        let posAvatar = avatar.mtxLocal.translation;
        for (let wall of _walls) {
            let posBounce = wall.calculateBounce(posAvatar, 1);
            if (posBounce) {
                avatar.mtxLocal.translation = posBounce;
                bouncedOff.push(wall);
            }
        }
        return bouncedOff;
    }
    function createWalls() {
        let walls = new fc.Node("Walls");
        let txtWall = new fc.TextureImage("../DoomAssets/CEMPOIS.png");
        let mtrWall = new fc.Material("Wall", fc.ShaderTexture, new fc.CoatTextured(null, txtWall));
        walls.appendChild(new L11_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.Y(sizeWall / 2), fc.Vector3.ZERO(), mtrWall));
        walls.appendChild(new L11_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.Y(sizeWall / 2), fc.Vector3.Y(180), mtrWall));
        /*  walls.appendChild(new Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(0.5, 1, -0.866), sizeWall / 2), fc.Vector3.Y(120), mtrWall));
         walls.appendChild(new Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-0.5, 1, -0.866), sizeWall / 2), fc.Vector3.Y(-120), mtrWall)); */
        for (let i = -numWalls / 2 + 0.5; i < numWalls / 2; i++) {
            walls.appendChild(new L11_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(-numWalls / 2, 0.5, i), sizeWall), fc.Vector3.Y(90), mtrWall));
            // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
            walls.appendChild(new L11_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(numWalls / 2, 0.5, i), sizeWall), fc.Vector3.Y(-90), mtrWall));
            // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
            walls.appendChild(new L11_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(i, 0.5, -numWalls / 2), sizeWall), fc.Vector3.Y(0), mtrWall));
            // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
            walls.appendChild(new L11_Doom_Enemy.Wall(fc.Vector2.ONE(3), fc.Vector3.SCALE(new fc.Vector3(i, 0.5, numWalls / 2), sizeWall), fc.Vector3.Y(180), mtrWall));
        }
        return walls;
    }
    /*   function createEnemy(): fc.Node {
        let enemy: fc.Node = new fc.Node("Enemy");
    
        let txtEnemy: fc.TextureImage = new fc.TextureImage("../DoomAssets/Annihilator.png");
        let mtrEnemy: fc.Material = new fc.Material("Enemy", fc.ShaderTexture, new fc.CoatTextured(null, txtEnemy));
    
        //let rotation: fc.ComponentTransform = new fc.ComponentTransform();
        //enemy.addComponent(rotation);
        //enemy.addComponent(new fc.ComponentTransform());
    
        enemy.appendChild(new Enemy(fc.Vector2.ONE(4), new fc.Vector3(5, sizeEnemies / 1.5, 0), new fc.Vector3(0, 0, 0), mtrEnemy));
    
        return enemy;
      } */
})(L11_Doom_Enemy || (L11_Doom_Enemy = {}));
//# sourceMappingURL=Main.js.map