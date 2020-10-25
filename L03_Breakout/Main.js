"use strict";
var L03_Breakout;
(function (L03_Breakout) {
    var fc = FudgeCore;
    window.addEventListener("load", hndLoad);
    let ball;
    let velocity = new fc.Vector3(fc.Random.default.getRange(-1, 1), fc.Random.default.getRange(-1, 0), 0);
    //let velocity: fc.Vector3 = new fc.Vector3(10, -10, 0);
    let speed = 18;
    velocity.normalize(speed);
    let paddle;
    let keysPressed = {};
    let obstacle = new Array(22);
    let root;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        root = new fc.Node("Root");
        // Ball
        ball = new fc.Node("Ball");
        ball.addComponent(new fc.ComponentTransform());
        let meshQuad = new fc.MeshQuad();
        let cmpQuad = new fc.ComponentMesh(meshQuad);
        ball.addComponent(cmpQuad);
        let mtrSolidWhite = new fc.Material("SolidWhite", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("WHITE")));
        let cMaterial = new fc.ComponentMaterial(mtrSolidWhite);
        ball.addComponent(cMaterial);
        root.addChild(ball);
        ball.mtxLocal.scale(new fc.Vector3(0.5, 0.5, 0.5));
        // Collision Walls
        root.appendChild(createNode("WallLeft", meshQuad, mtrSolidWhite, new fc.Vector2(-21, 0), new fc.Vector2(1, 27)));
        root.appendChild(createNode("WallRight", meshQuad, mtrSolidWhite, new fc.Vector2(21, 0), new fc.Vector2(1, 27)));
        root.appendChild(createNode("WallTop", meshQuad, mtrSolidWhite, new fc.Vector2(0, 14), new fc.Vector2(42, 1)));
        root.appendChild(createNode("WallBottom", meshQuad, mtrSolidWhite, new fc.Vector2(0, -14), new fc.Vector2(42, 1)));
        // Paddle
        paddle = createNode("Paddle", meshQuad, mtrSolidWhite, new fc.Vector2(0, -12), new fc.Vector2(5, 0.5));
        root.appendChild(paddle);
        // Obstacle
        let mtrRed = new fc.Material("Red", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("RED")));
        let xPos = 1;
        for (let i = 0; i < 10; i++) {
            obstacle[i] = createNode("Obstacle" + i, meshQuad, mtrRed, new fc.Vector2(-19 + xPos, 12), new fc.Vector2(3, 0.5));
            root.appendChild(obstacle[i]);
            xPos += 4;
        }
        // Camera
        let cmpCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);
        // Input
        document.addEventListener("keydown", hndKeydown);
        document.addEventListener("keyup", hndKeyup);
        // Viewport
        L03_Breakout.viewport = new fc.Viewport();
        L03_Breakout.viewport.initialize("Viewport", root, cmpCamera, canvas);
        fc.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 60);
    }
    function hndLoop(_event) {
        if (keysPressed[fc.KEYBOARD_CODE.ARROW_LEFT])
            paddle.cmpTransform.local.translate(new fc.Vector3(-0.5));
        if (keysPressed[fc.KEYBOARD_CODE.ARROW_RIGHT])
            paddle.cmpTransform.local.translate(fc.Vector3.X(0.5));
        /*         console.log("X: " + velocity.x);
                console.log("Y: " + velocity.y); */
        let frameTime = fc.Time.game.getElapsedSincePreviousCall() / 500;
        let move = fc.Vector3.SCALE(velocity, frameTime);
        ball.mtxLocal.translate(move);
        let hit = false;
        for (let node of root.getChildren()) {
            if (node.name == "Ball")
                continue;
            hit = detectHit(ball.cmpTransform.local.translation, node);
            if (hit) {
                processHit(node);
                break;
            }
        }
        L03_Breakout.viewport.draw();
    }
    function detectHit(_position, _node) {
        let sclRect = _node.getComponent(fc.ComponentMesh).pivot.scaling.copy;
        let posRect = _node.cmpTransform.local.translation.copy;
        let rect = new fc.Rectangle(posRect.x, posRect.y, sclRect.x, sclRect.y, fc.ORIGIN2D.CENTER);
        return rect.isInside(_position.toVector2());
    }
    function processHit(_node) {
        fc.Debug.log("Reflect at ", _node.name);
        //let hitsObstacle: number = 0;
        for (var i in obstacle) {
            switch (_node.name) {
                case "Obstacle" + i:
                    obstacle[i].cmpTransform.local.translate(new fc.Vector3(-50, 0, 0));
                    velocity.y *= -1;
                    /* hitsObstacle++;
                    if (hitsObstacle >= 2) {
                        velocity.y *= 10;
                        velocity.x *= 10;
                    }
                    if (hitsObstacle >= 4) {
                        velocity.y *= 10;
                        velocity.x *= 10;
                    } */
                    break;
            }
        }
        switch (_node.name) {
            case "WallTop":
                velocity.y *= -1;
                break;
            case "WallBottom":
                //velocity.y *= -1;
                velocity.y = 0;
                velocity.x = 0;
                break;
            case "WallRight":
                velocity.x *= -1;
                break;
            case "WallLeft":
                velocity.x *= -1;
                break;
            case "Paddle":
                velocity.y *= -1;
                break;
            default:
                fc.Debug.warn("Oh, no, I hit something unknown!!", _node.name);
                break;
        }
    }
    function createNode(_name, _mesh, _material, _translation, _scaling) {
        let node = new fc.Node(_name);
        node.addComponent(new fc.ComponentTransform);
        node.addComponent(new fc.ComponentMaterial(_material));
        node.addComponent(new fc.ComponentMesh(_mesh));
        node.cmpTransform.local.translate(_translation.toVector3());
        node.getComponent(fc.ComponentMesh).pivot.scale(_scaling.toVector3());
        return node;
    }
    function hndKeyup(_event) {
        keysPressed[_event.code] = false;
    }
    function hndKeydown(_event) {
        keysPressed[_event.code] = true;
    }
})(L03_Breakout || (L03_Breakout = {}));
//# sourceMappingURL=Main.js.map