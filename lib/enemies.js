export
var enemies = {

  "Guard": {
    name: "Guard",
    foundAt: "Narshe (Vicks/Wedge/Terra raid), Vector",

    type: 'mob',
    level: 5,
    hp: 40,
    mp: 15,
    exp: 48,
    gp: 48,

    battlePower: 16,
    speed: 30,
    hitRate: 100,
    magicPower: 6,
    defense: 100,
    magicDefense: 140,
    evade: 0,
    magicBlock: 0,

    steal: ["Potion", "Tonic"],
    win: ["Tonic"],

    morph: ["Antidote", "Green Cherry", "Eyedrop", "Soft"],
    morphMiss: 0,

    weakness: "Poison",


    rage: ["Battle", "Special"],
    sketch: "Battle",
    control: "Battle",

    specialInfo: "Human",


    weaponGraphic: "Dirk",

    specialAttack: ["Critical", "(Attack LV. 1)"]
  },

  "Repo Man": {
    name: "Repo Man",
    foundAt: "Narshe Mines",

    type: 'mob',
    level: 5,
    hp: 35,
    mp: 0,
    exp: 25,
    gp: 25,

    battlePower: 19,
    speed: 35,
    hitRate: 100,
    magicPower: 10,
    defense: 90,
    magicDefense: 120,
    evade: 0,
    magicBlock: 0,

    steal: ["Tonic", "Tonic"],
    win: ["Tonic"],

    morph: ["Antidote", "Green Cherry", "Eyedrop", "Soft"],
    morphMiss: 0,

    weakness: "Poison",


    rage: ["Battle", "Exploder"],
    sketch: ["Battle", "Flare"],
    control: ["Battle", "Special", "Special", "Special"],

    specialInfo: "Human",


    weaponGraphic: "Dirk",

    specialAttack: ["Wrench", "(Attack LV. 1)"]
  }
}