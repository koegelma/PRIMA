"use strict";
var L14_Doom_UI;
(function (L14_Doom_UI) {
    let hp = 100;
    let ammo = 30;
    let armor = 100;
    class Hud {
        static displayPosition(_position) {
            let divHP = document.querySelector("div#HP");
            divHP.innerHTML = "HP: " + hp.toString() + "%";
            let divAmmo = document.querySelector("div#Ammo");
            divAmmo.innerHTML = "AMMO: " + ammo.toString();
            let divArmor = document.querySelector("div#Armor");
            divArmor.innerHTML = "ARMOR: " + armor.toString() + "%";
        }
    }
    L14_Doom_UI.Hud = Hud;
})(L14_Doom_UI || (L14_Doom_UI = {}));
//# sourceMappingURL=Hud.js.map