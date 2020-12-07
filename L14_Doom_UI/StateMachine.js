"use strict";
var L14_Doom_UI;
(function (L14_Doom_UI) {
    var fcaid = FudgeAid;
    class ComponentStateMachineEnemy extends fcaid.ComponentStateMachine {
        constructor() {
            super();
            this.instructions = ComponentStateMachineEnemy.instructions;
        }
        static setupStateMachine() {
            let setup = new fcaid.StateMachineInstructions();
            setup.setAction(L14_Doom_UI.JOB.PATROL, (_machine) => {
                let container = _machine.getContainer();
                // console.log(container);
                if (container.mtxLocal.translation.equals(container.posTarget, 0.1))
                    _machine.transit(L14_Doom_UI.JOB.IDLE);
                container.move();
            });
            setup.setTransition(L14_Doom_UI.JOB.PATROL, L14_Doom_UI.JOB.IDLE, (_machine) => {
                let container = _machine.getContainer();
                fc.Time.game.setTimer(3000, 1, (_event) => {
                    container.chooseTargetPosition();
                    _machine.transit(L14_Doom_UI.JOB.PATROL);
                });
            });
            return setup;
        }
    }
    ComponentStateMachineEnemy.instructions = ComponentStateMachineEnemy.setupStateMachine();
    L14_Doom_UI.ComponentStateMachineEnemy = ComponentStateMachineEnemy;
})(L14_Doom_UI || (L14_Doom_UI = {}));
//# sourceMappingURL=StateMachine.js.map