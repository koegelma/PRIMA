namespace L01_FirstFudge {
    console.log("Hallo");
    import fc = FudgeCore;

    console.log(fc);
    window.addEventListener("load", hndLoad);
    export let viewport: fc.Viewport;

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fc.Debug.log(canvas);

        let node: fc.Node = new fc.Node("Quad");

        let mesh: fc.MeshQuad = new fc.MeshQuad();
        let cmpMesh: fc.ComponentMesh = new fc.ComponentMesh(mesh);
        node.addComponent(cmpMesh);
        
        let mtrSolidWhite: fc.Material = new fc.Material("SolidWhite", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("WHITE")));
        let cmpMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMaterial);

        let cmpCamera: fc.ComponentCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translateZ(2);
        cmpCamera.pivot.rotateY(180);

        viewport = new fc.Viewport();
        viewport.initialize("Viewport", node, cmpCamera, canvas);
        fc.Debug.log(viewport);

        viewport.draw();
    }
}