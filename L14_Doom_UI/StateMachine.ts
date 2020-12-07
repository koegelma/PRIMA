namespace L14_Doom_UI {
  import fcaid = FudgeAid;

  export class ComponentStateMachineEnemy extends fcaid.ComponentStateMachine<JOB> {
    private static instructions: fcaid.StateMachineInstructions<JOB> = ComponentStateMachineEnemy.setupStateMachine();

    public constructor() {
      super();
      this.instructions = ComponentStateMachineEnemy.instructions;
    }

    private static setupStateMachine(): fcaid.StateMachineInstructions<JOB> {
      let setup: fcaid.StateMachineInstructions<JOB> = new fcaid.StateMachineInstructions();

      setup.setAction(JOB.PATROL, (_machine) => {
        let container: Enemy = <Enemy>(<fcaid.ComponentStateMachine<JOB>>_machine).getContainer();
        // console.log(container);
        if (container.mtxLocal.translation.equals(container.posTarget, 0.1))
          _machine.transit(JOB.IDLE);
        container.move();
      });

      setup.setTransition(JOB.PATROL, JOB.IDLE, (_machine) => {
        let container: Enemy = <Enemy>(<fcaid.ComponentStateMachine<JOB>>_machine).getContainer();
        fc.Time.game.setTimer(3000, 1, (_event: fc.EventTimer) => {
          container.chooseTargetPosition();
          _machine.transit(JOB.PATROL);
        });
      });

      return setup;
    }
  }
}