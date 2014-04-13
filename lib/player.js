console.log('who cares');

import { calcDamage } from "./damage";
import { Stats } from "./stats";

export class Player extends Stats {
  constructor (playerStats) {
    super();
    _.extend(this, playerStats)
    this.calcDamage = calcDamage.bind(this);

    console.log("playerStats", playerStats);

    this.left = 'empty';
    this.left = 'empty';

    
  }

  // Returns the number of currently equipped relics
  // that match the parameter.
  hasRelic(relic) {
    // console.log('checking relics...');
    // console.log(this.name, '\'s relics are', this.relics);

    return _.filter(this.relics, function(item) {
      return item === relic;
    }).length;
  }

  // Returns true if status is present.
  hasStatus(status) {
    return _.contains(this.statuses, status);
  }
}
