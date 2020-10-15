"use strict";
var L01_FirstFudge;
(function (L01_FirstFudge) {
    console.log("Hallo");
    var fc = FudgeCore;
    console.log(fc);
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        fc.Debug.log(canvas);
        let node = new fc.Node("Quad");
        let mesh = new fc.MeshQuad();
        let cmpMesh = new fc.ComponentMesh(mesh);
        node.addComponent(cmpMesh);
        let mtrSolidWhite = new fc.Material("SolidWhite", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("WHITE")));
        let cmpMaterial = new fc.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMaterial);
        let cmpCamera = new fc.ComponentCamera();
        cmpCamera.pivot.translateZ(2);
        cmpCamera.pivot.rotateY(180);
        L01_FirstFudge.viewport = new fc.Viewport();
        L01_FirstFudge.viewport.initialize("Viewport", node, cmpCamera, canvas);
        fc.Debug.log(L01_FirstFudge.viewport);
        L01_FirstFudge.viewport.draw();
    }
})(L01_FirstFudge || (L01_FirstFudge = {}));
//# sourceMappingURL=Main.js.map