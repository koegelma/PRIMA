"use strict";
var L03_Breakout;
(function (L03_Breakout) {
    var fc = FudgeCore;
    window.addEventListener("load", hndLoad);
    // window.addEventListener("click", sceneLoad);
    let ball;
    let velocity = new fc.Vector3(fc.Random.default.getRange(-1, 1), fc.Random.default.getRange(-1, 1), 0);
    let speed = 15;
    velocity.normalize(speed);
    let root;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        // ƒ.Debug.log(canvas);
        root = new fc.Node("Root");
        ball = new fc.Node("Ball");
        ball.addComponent(new fc.ComponentTransform());
        let meshQuad = new fc.MeshQuad();
        let cmpQuad = new fc.ComponentMesh(meshQuad);
        ball.addComponent(cmpQuad);
        let mtrSolidWhite = new fc.Material("SolidWhite", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("WHITE")));
        let cMaterial = new fc.ComponentMaterial(mtrSolidWhite);
        ball.addComponent(cMaterial);
        root.addChild(ball);
        let cmpCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);
        L03_Breakout.viewport = new fc.Viewport();
        L03_Breakout.viewport.initialize("Viewport", root, cmpCamera, canvas);
        // ƒ.Debug.log(viewport);
        fc.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 30);
    }
    function hndLoop(_event) {
        // console.log("Tick");
        let frameTime = fc.Time.game.getElapsedSincePreviousCall() / 1000;
        let move = fc.Vector3.SCALE(velocity, frameTime);
        ball.mtxLocal.translate(move);
        L03_Breakout.viewport.draw();
    }
})(L03_Breakout || (L03_Breakout = {}));
//# sourceMappingURL=Main.js.map