"use strict";
var Geometry_Dash;
(function (Geometry_Dash) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    // window.addEventListener("click", sceneLoad);
    let walls;
    let player;
    let root;
    let obstacles;
    //let timeCounter: number = 0;
    let control = new ƒ.Control("PaddleControl", 20, 0 /* PROPORTIONAL */);
    control.setDelay(80);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        // ƒ.Debug.log(canvas);
        root = new ƒ.Node("Root");
        player = new Geometry_Dash.Moveable("Paddle", new ƒ.Vector2(0, -4), new ƒ.Vector2(2, 2));
        root.addChild(player);
        walls = new ƒ.Node("Walls");
        root.addChild(walls);
        walls.addChild(new Geometry_Dash.GameObject("WallLeft", new ƒ.Vector2(-21, 0), new ƒ.Vector2(1, 28)));
        walls.addChild(new Geometry_Dash.GameObject("WallRight", new ƒ.Vector2(21, 0), new ƒ.Vector2(1, 28)));
        walls.addChild(new Geometry_Dash.GameObject("WallTop", new ƒ.Vector2(0, 14), new ƒ.Vector2(43, 1)));
        walls.addChild(new Geometry_Dash.GameObject("WallBottom", new ƒ.Vector2(0, -8), new ƒ.Vector2(43, 1)));
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);
        Geometry_Dash.viewport = new ƒ.Viewport();
        Geometry_Dash.viewport.initialize("Viewport", root, cmpCamera, canvas);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 30);
    }
    function hndLoop(_event) {
        Geometry_Dash.viewport.draw();
        obstacles = setupObstacles();
        root.addChild(obstacles);
        //timeCounter++;
        setupControlBorders();
        player.velocity = ƒ.Vector3.X(control.getOutput());
        player.move();
    }
    function setupControlBorders() {
        if (player.mtxLocal.translation.x < -17) {
            control.setInput(ƒ.Keyboard.mapToValue(-0, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])
                + ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]));
        }
        else if (player.mtxLocal.translation.x > 17) {
            control.setInput(ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])
                + ƒ.Keyboard.mapToValue(0, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]));
        }
        else {
            control.setInput(ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])
                + ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]));
        }
    }
    function setupObstacles() {
        let obstacles = new ƒ.Node("Obstacles");
        for (let i = 0; i < 10; i++) {
            let x = 20;
            let y = ƒ.Random.default.getRange(-8, 8);
            obstacles.addChild(new Geometry_Dash.GameObject(`Obstacle-${i}`, new ƒ.Vector2(x, y), new ƒ.Vector2(1, ƒ.Random.default.getRange(3, 10))));
        }
        return obstacles;
    }
})(Geometry_Dash || (Geometry_Dash = {}));
//# sourceMappingURL=Main.js.map