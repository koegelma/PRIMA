"use strict";
var L05_BreakOut_Bricks;
(function (L05_BreakOut_Bricks) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    // window.addEventListener("click", sceneLoad);
    let ball;
    let walls;
    let paddle;
    let root;
    let bricks = new Array(50);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        // ƒ.Debug.log(canvas);
        root = new ƒ.Node("Root");
        ball = new L05_BreakOut_Bricks.Moveable("Ball", new ƒ.Vector2(0, 0), new ƒ.Vector2(1, 1));
        root.addChild(ball);
        walls = new ƒ.Node("Walls");
        root.addChild(walls);
        walls.addChild(new L05_BreakOut_Bricks.GameObject("WallLeft", new ƒ.Vector2(-21, 0), new ƒ.Vector2(1, 28)));
        walls.addChild(new L05_BreakOut_Bricks.GameObject("WallRight", new ƒ.Vector2(21, 0), new ƒ.Vector2(1, 28)));
        walls.addChild(new L05_BreakOut_Bricks.GameObject("WallTop", new ƒ.Vector2(0, 14), new ƒ.Vector2(43, 1)));
        walls.addChild(new L05_BreakOut_Bricks.GameObject("WallBottom", new ƒ.Vector2(0, -14), new ƒ.Vector2(43, 1)));
        paddle = new L05_BreakOut_Bricks.GameObject("Paddle", new ƒ.Vector2(0, -12), new ƒ.Vector2(5, 0.5));
        root.addChild(paddle);
        setupBricks();
        /* brick = new GameObject("Brick", new ƒ.Vector2(-18, 12), new ƒ.Vector2(3, 0.5));
        root.addChild(brick); */
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);
        L05_BreakOut_Bricks.viewport = new ƒ.Viewport();
        L05_BreakOut_Bricks.viewport.initialize("Viewport", root, cmpCamera, canvas);
        // ƒ.Debug.log(viewport);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 144);
    }
    function hndLoop(_event) {
        document.addEventListener("keydown", hndInput);
        ball.move();
        L05_BreakOut_Bricks.viewport.draw();
        hndCollision();
    }
    function hndInput(_event) {
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
    function hndCollision() {
        for (let wall of walls.getChildren()) {
            ball.checkCollision(wall);
        }
        ball.checkCollision(paddle);
        for (var brick in bricks) {
            ball.checkCollision(bricks[brick]);
            //bricks[brick].cmpTransform.local.translate(new ƒ.Vector3(-50, 0, 0));
        }
    }
    function setupBricks() {
        for (let row = 1; row < 6; row++) {
            for (let col = 1; col < 38; col += 4) {
                bricks[row + col] = new L05_BreakOut_Bricks.GameObject("Brick" + row + col, new ƒ.Vector2(-19 + col, 13 - row), new ƒ.Vector2(3, 0.5));
                root.addChild(bricks[row + col]);
            }
        }
    }
})(L05_BreakOut_Bricks || (L05_BreakOut_Bricks = {}));
//# sourceMappingURL=Main.js.map