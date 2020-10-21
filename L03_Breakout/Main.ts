namespace L03_Breakout {
    import fc = FudgeCore;

    window.addEventListener("load", hndLoad);
    // window.addEventListener("click", sceneLoad);
    let ball: fc.Node;
    let velocity: fc.Vector3 = new fc.Vector3(fc.Random.default.getRange(-1, 1), fc.Random.default.getRange(-1, 1), 0);
    let speed: number = 15;
    velocity.normalize(speed);

    export let viewport: fc.Viewport;
    let root: fc.Node;

    function hndLoad(_event: Event): void {

        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        // ƒ.Debug.log(canvas);

        root = new fc.Node("Root");

        ball = new fc.Node("Ball");
        ball.addComponent(new fc.ComponentTransform());
        let meshQuad: fc.MeshQuad = new fc.MeshQuad();
        let cmpQuad: fc.ComponentMesh = new fc.ComponentMesh(meshQuad);
        ball.addComponent(cmpQuad);

        let mtrSolidWhite: fc.Material = new fc.Material("SolidWhite", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("WHITE")));
        let cMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(mtrSolidWhite);
        ball.addComponent(cMaterial);

        root.addChild(ball);

        let cmpCamera: fc.ComponentCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);


        viewport = new fc.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        // ƒ.Debug.log(viewport);

        fc.Loop.addEventListener(fc.EVENT.LOOP_FRAME, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 30);
    }

    function hndLoop(_event: Event): void {
        // console.log("Tick");
        let frameTime: number = fc.Time.game.getElapsedSincePreviousCall() / 1000;
        let move: fc.Vector3 = fc.Vector3.SCALE(velocity, frameTime);
        ball.mtxLocal.translate(move);
        viewport.draw();
    }
}