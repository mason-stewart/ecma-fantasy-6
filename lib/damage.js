// Damage Calculation, Steps 1a, 1b, 1c, 1d

function maxDamageSpell(spell, caster) {

  if (attacker.type === 'mob') {
    // For magical attacks made by monsters:
    // Damage = Spell Power * 4 + (Level * (Magic Power * 3/2) * Spell Power / 32)
    return spell.power * 4 + (caster.level * (caster.magicPower * (3 / 2)) * spell.power / 32);

  } else {
    // For magical attacks made by characters:
    // Damage = Spell Power * 4 + (Level * Magic Power * Spell Power / 32)
    return spell.power * 4 + (caster.level * caster.magicPower * spell.power / 32);
  }
}

function maxDamageAttack(attacker) {

  if (attacker.type === 'mob') {
    // Note that vigor for each monster is randomly determined at the beginning of
    // the battle as [56..63]
    var vigor = Math.floor(Math.random() * 7 + 56);

    // Step 1a. Damage = Level * Level * (Battle Power * 4 + Vigor) / 256
    return ((Math.pow(attacker.level, 2) * (attacker.battlePower * 4 + vigor)) / 256);

  } else {
    // For physical attacks made by characters:

    // Step 1a. Vigor2 = Vigor * 2
    // If Vigor >= 128 then Vigor2 = 255 instead
    var vigor = attacker.vigor * 2 >= 128 ? 255 : attacker.vigor * 2;

    // Step 1b. Attack = Battle Power + Vigor2
    // Step 1c. If equipped with Gauntlet, Attack = Attack + Battle Power * 3 / 4
    if (attacker.hasRelic('Gauntlet')) {
      var attack = ((attacker.battlePower * 2) + vigor) * (3 / 4);
    } else {
      var attack = attacker.battlePower + vigor;
    }

    // Step 1d. Damage = Battle Power + ((Level * Level * Attack) / 256) * 3 / 2
    var damage = attacker.battlePower + ((Math.pow(attacker.level, 2) * attack) / 256) * (3 / 2);

    console.log('after maxDamageAttack, damage is', damage);
    return damage;
  }
}


// Damage Calculation, Steps 1e, 1f, and Step 2

function equipmentAdjustmentsAttack(attacker, damage) {

  // N.B. - Steps 1e, and 1f really make more sense here,
  // but I've kept Terri Senshi's original step numbers for 
  // cross reference purposes.

  // Step 1e. If character is equipped with an Offering, Damage = Damage / 2
  if (attacker.hasRelic('Offering')) {
    damage = damage / 2;
  }

  // Step 1f. If the attack is a standard fight attack and the character is
  // equipped with a Genji Glove, but only one or zero weapons, Damage = ceil(Damage * 3 / 4)
  if (attacker.hasRelic('Genji Glove') && (attacker.left === 'empty' || attacker.right === 'empty')) {
    damage = Math.ceil(damage * (3 / 4));
  }

  // Step 2. Atlas Armlet / Earring

  // Step 2a. If physical attack and attacker is equipped with Atlas Armlet or Hero Ring:
  // Damage = Damage * 5/4
  if (attacker.hasRelic('Atlas Armlet') || attacker.hasRelic('Hero Ring')) {
    damage = damage * (5 / 4);
  }

  console.log('after equipmentAdjustmentsAttack, damage is', damage);
  return damage;
}

function equipmentAdjustmentsSpell(caster, damage) {

  // Step 2b. If magical attack and attacker is equipped with 1 Earring or Hero Ring:
  // Damage = Damage * 5/4 

  if (attacker.hasRelic('Earring') === 1 || attacker.hasRelic('Hero Ring') === 1) {
    damage = damage * (5 / 4);
  }


  // Step 2c. If magical attack and attacker is equipped with 2 Earrings / Hero Rings:
  // Damage = Damage + (Damage / 4) + (Damage / 4)

  if (attacker.hasRelic('Earring') === 2 || attacker.hasRelic('Hero Ring') === 2) {
    damage = damage + (damage / 2);
  };
  
  console.log('after equipmentAdjustmentsSpell, damage is', damage)
  return damage;
}


// Step 3. Multiple targets

function multipleTargetAdjustment(targets, damage) {

  // If magical attack and the attack is targeting more than one target:
  // Damage = Damage / 2
  // Note: Some spells skip this step

  if (targets.length > 1) {
    damage = damage / 2;
  }
  console.log('after multipleTargetAdjustment, damage is', damage);
  return damage;
}


// Step 4. Attacker's row

function attackersRow(attacker, command, damage) {

  // If Fight command and the attacker is in the back row:
  // Damage = Damage / 2
  if (command === 'Fight' && attacker.row == 'Back') {
    damage = damage / 2;
  }
  console.log('after attackersRow, damage is', damage);
  return damage;
}


// Step 5. Damage Multipliers #1

function damageMultipliers(attacker, magical, damage) {

  // The damage multiplier starts out = 0.
  var multiplier = 0;

  // The following add to the damage multiplier:
  // Morph (attacker) - If Attacker has morph status add 2 to damage multiplier
  if (attacker.hasStatus('Morph')) {
    multiplier += 2;
  }

  // Berserk - If physical attack and attacker has berserk status 
  // add 1 to damage multiplier
  if (attacker.hasStatus('Berserk') && !magical) {
    multiplier += 1;
  }

  // Critical hit - Standard attacks have a 1 in 32 chance of being a 
  // critical hit. If attack is a critical hit add 2 to damage multiplier
  var criticalHitRoll = Math.floor(Math.random() * 32) + 1
  console.log('critical hit roll was', criticalHitRoll);
  if (criticalHitRoll === 32) {
    multiplier += 2;
  }

  console.log('after damageMultipliers, damage is', damage);
  // Step 5a. Damage = Damage + ((Damage / 2) * damage multiplier)
  return damage + ((damage / 2) * multiplier);
}


// Step 6. Damage modification

function damageMods (attacker, target, magical, attack, damage){

  // Step 6a. Random Variance
  // Damage = (Damage * [224..255] / 256) + 1
  console.log(
    'during 6a, damage range is [',
    (damage * (224 / 256) + 1),
    '...',
    (damage * (255 / 256) + 1)
  );
  damage = (damage * ((Math.floor(Math.random()*31) + 224) / 256) + 1);
  console.log('after 6a, damage is',damage);

  // Step 6b. Defense modification
  // Damage = (Damage * (255 - Defense) / 256) + 1
  // Magical attacks use Magic defense
  var def = magical ? target.magicDefense : target.defense;
  console.log(def);
  damage = (damage * (255 - def) / 256) + 1;
  console.log('after 6b, damage is',damage);

  // Step 6c. Safe / Shell
  // If magical attack and target has shell status, or physical attack 
  // and target has safe status:
  // Damage = (Damage * 170 / 256) + 1
  if ((magical && target.hasStatus('Shell')) || (!magical && target.hasStatus('Safe'))) {
    damage = damage * 170 / 256 + 1;
  }

  // Step 6d. Target Defending
  // If physical attack and target is Defending:
  // Damage = Damage / 2
  if (!magical && target.defending) {
    damage = damage /2;
  }

  // Step 6e. Target's row
  // If physical attack and target is in back row:
  // Damage = Damage / 2
  if (!magical && attacker.row == 'Back') {
    damage = damage / 2;
  }

  // Step 6f. Morph (target)
  // If magical attack and target has morph status:
  // Damage = Damage / 2
  if (magical && attacker.hasStatus('Morph')) {
    damage = damage / 2;
  }

  // Step 6g. Self Damage
  // Healing attacks skip this step
  // If the attacker and target are both characters:
  // Damage = Damage / 2
  if (attack.type !== 'Healing' && attacker === target) {
    damage = damage / 2;
  }
  console.log('after damageMods, damage is', damage);
  return damage;
}


// Step 7. Damage multipliers #2

function damageMultipliersSecondary (attacker, target, damage) {

  // The damage multiplier starts out = 0.
  var multiplier = 0;  

  // The following add to the damage multiplier:
  // Hitting target in back - If physical attack and attack hits the back of the// target, then 1 is added to the damage multiplier
  if (attacker.facingLeft !== target.facingLeft) {
    multiplier += 1;
  }

  // Step 7a. Damage = Damage + ((Damage / 2) * damage multiplier)
  console.log('after damageMultipliersSecondary, damage is', damage);
  return damage + ((damage /2) * multiplier);
}


// Step 8. Petrify damage
// should this be here? seems like a lot of calculation will have occurred
// just to nullify it based on Petrify status.

function petrifyDamage (target, damage) {
  // If the target has petrify status, then damage is set to 0.
  if (target.hasStatus('Petrify')) {
    damage = 0;
  }
  console.log('after petrifyDamage, damage is', damage);
  return damage;
}


// Step 9. Elemental resistance
// geez, what the fuck am i supposed to do with this?
function elementalResistance (damage) {

  // For each step, if the condition is met, no further steps are checked. So for
  // example, if the target absorbs the element, then steps 9c to 9e are not checked.

  // Step 9a. If the element has been nullified (by Force Field), then: 
  // Damage = 0.

  // Step 9b. If target absorbs the element of the attack, then damage is
  // unchanged, but it heals HP instead of dealing damage

  // Step 9c. If target is immune to the element of the attack: Damage = 0

  // Step 9d. If target is resistant to the element of the attack
  // Damage = Damage / 2

  // Step 9e. If target is weak to the element of the attack: 
  // Damage = Damage * 2
  console.log('after elementalResistance, damage is', damage);
  return damage;

}



// so function composition, wow, such pure
export function calcDamage(targets = [], magical = false, command = 'Fight', attack, attacker) {
  var attacker = attacker || this;

  // zip up each target with its damage
  return _.zip(targets, _.map(targets, function(target){ 
    if (magical) {
      // do magical stuff
    } else {
      return Math.floor(elementalResistance(
        petrifyDamage(
          target,
          damageMultipliersSecondary(
            attacker,
            target,
            damageMods(
              attacker,
              target,
              false,
              {}, // attack object? this sucks
              damageMultipliers(
                attacker,
                false,
                attackersRow(
                  attacker,
                  command,
                  equipmentAdjustmentsAttack(
                    attacker,
                    maxDamageAttack(attacker)))))))));

    }
  }))


}