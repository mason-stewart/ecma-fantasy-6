mocha.setup({ui: 'bdd', globals: []});

var expect = chai.expect;
console.log('player is ', player);

describe("Staying cool", function(){
  it("is important", function(){
    expect(player.cool).to.equal(1);
  })
})

window.mochaPhantomJS ? mochaPhantomJS.run() : mocha.run();

