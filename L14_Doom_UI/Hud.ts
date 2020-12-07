namespace L14_Doom_UI {

  let hp: number = 100;
  let ammo: number = 30;
  let armor: number = 100;
  
  export class Hud {
    public static displayPosition(_position: fc.Vector3): void {
      let divHP: HTMLDivElement = document.querySelector("div#HP");
      divHP.innerHTML = "HP: " + hp.toString() + "%";

      let divAmmo: HTMLDivElement = document.querySelector("div#Ammo");
      divAmmo.innerHTML = "AMMO: " + ammo.toString();

      let divArmor: HTMLDivElement = document.querySelector("div#Armor");
      divArmor.innerHTML = "ARMOR: " + armor.toString() + "%";
      
    }
  }
}