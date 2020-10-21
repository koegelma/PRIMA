namespace L01_FirstFudge {
    import fc = FudgeCore;

    window.addEventListener("load", hndLoad);
    // window.addEventListener("click", sceneLoad);

    export let viewport: fc.Viewport;
    let root: fc.Node;

    let ball: fc.Node = new fc.Node("Ball");
    let meshBall: fc.MeshTorus = new fc.MeshTorus();
    let cmpBall: fc.ComponentMesh = new fc.ComponentMesh(meshBall);
    cmpBall.pivot.translateZ(-100);
    cmpBall.pivot.rotateX(90);


    let trackZ: number = 35;


    function hndLoad(_event: Event): void {

        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        // ƒ.Debug.log(canvas);

        root = new fc.Node("Root");
        root.addComponent(new fc.ComponentTransform());


        //Quad
        /*         let quad: fc.Node = new fc.Node("Quad");
                let meshQuad: fc.MeshQuad = new fc.MeshQuad();
                let cmpQuad: fc.ComponentMesh = new fc.ComponentMesh(meshQuad);
                quad.addComponent(cmpQuad);
        
                let mtrSolidWhite: fc.Material = new fc.Material("SolidWhite", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("WHITE")));
                let cMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(mtrSolidWhite);
                quad.addComponent(cMaterial);
        
                root.addChild(quad); */

        //Ball
        /*         let ball: fc.Node = new fc.Node("Ball");
                let meshBall: fc.MeshTorus = new fc.MeshTorus();
                let cmpBall: fc.ComponentMesh = new fc.ComponentMesh(meshBall);
                cmpBall.pivot.translateZ(-100);
                cmpBall.pivot.rotateX(90); */

        //UP & DOWN (Y from -34 to 34)
        //   cmpBall.pivot.translateY(0);

        //LEFT & RIGHT(X from -69 to 69)
        //    cmpBall.pivot.translateX(-69);

        ball.addComponent(cmpBall);

        let mtrSolidWhite: fc.Material = new fc.Material("SolidWhite", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("WHITE")));
        let cMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(mtrSolidWhite);
        ball.addComponent(cMaterial);

        root.addChild(ball);



        //Torus
        /* let torus: fc.Node = new fc.Node("Torus");

        let meshTorus: fc.MeshTorus = new fc.MeshTorus("Torus", 1, 10, 1);
        let cmpTorus: fc.ComponentMesh = new fc.ComponentMesh(meshTorus);
        cmpTorus.pivot.translateX(0);
        cmpTorus.pivot.rotateZ(90);
        cmpTorus.pivot.rotateX(90);
        torus.addComponent(cmpTorus);

        let orange: fc.Material = new fc.Material("Orange", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("ORANGE")));
        let corange: fc.ComponentMaterial = new fc.ComponentMaterial(orange);
        torus.addComponent(corange);


        root.appendChild(torus); */


        //Cube
        /* let cube: fc.Node = new fc.Node("Cube");
        let meshCube: fc.MeshCube = new fc.MeshCube();
        let cmpCube: fc.ComponentMesh = new fc.ComponentMesh(meshCube);
        let red: fc.Material = new fc.Material("Red", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("RED")));
        let cred: fc.ComponentMaterial = new fc.ComponentMaterial(red);

        cmpCube.pivot.scaleX(0.5);
        cmpCube.pivot.scaleY(0.5);

        torus.addComponent(corange);
        cube.addComponent(cmpCube);
        cube.addComponent(cred);
        root.appendChild(cube);
 */

        let cmpCamera: fc.ComponentCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translateZ(4);
        cmpCamera.pivot.rotateY(180);


        viewport = new fc.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        // ƒ.Debug.log(viewport);

        fc.Loop.addEventListener(fc.EVENT.LOOP_FRAME, hndLoop);
        fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 30);
    }

    function hndLoop(_event: Event): void {
        // console.log("Tick");
        // root.mtxLocal.rotateZ(0);

        if (trackZ > 0 && trackZ <= 68) {
            cmpBall.pivot.translateZ(1);
            //cmpBall.pivot.translateX(1);
            trackZ++;
            if (trackZ > 68) {
                trackZ = -1;
            }
        } else if (trackZ < 0 && trackZ >= -68) {
            cmpBall.pivot.translateZ(-1);
            //cmpBall.pivot.translateX(-1);
            trackZ--;
            if (trackZ < -68) {
                trackZ = 1;
            }
        }



        viewport.draw();
    }
}