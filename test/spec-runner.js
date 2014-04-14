import { Player, characters, enemies } from 'lib/game';

mocha.setup({ui: 'bdd', globals: []});

var expect = chai.expect;

describe("Damage calculations", function(){
  
  var terra = new Player(characters["Terra"]);
  console.log('terra is', terra);
  var repoMan = new Player(enemies["Repo Man"]);
  
  beforeEach(function(){
    // ...
  });

  it("should be within a reasonable range", function(){
    // this test will fail if critical hit occurs. Plz fix.
    var damage = terra.calcDamage([repoMan])[0][1]
    expect(damage).to.be.above(16);
    expect(damage).to.be.below(24);
  })
})

window.mochaPhantomJS ? mochaPhantomJS.run() : mocha.run();

