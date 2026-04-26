const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const createFighterState = (fighter) => ({
  ...fighter,
  health: fighter.combat.maxHealth,
  energy: 35,
  shield: 0,
  defending: false,
});

export function createBattleState(player, opponent) {
  return {
    player: createFighterState(player),
    opponent: createFighterState(opponent),
    turn: "player",
    round: 1,
    winner: null,
    log: [
      {
        id: 1,
        tone: "system",
        text: `${player.name} enters the arena against ${opponent.name}. Stormglass shields are online.`,
      },
    ],
  };
}

function withLog(state, text, tone = "neutral") {
  const nextLog = [
    {
      id: Date.now() + Math.random(),
      tone,
      text,
    },
    ...state.log,
  ];

  return {
    ...state,
    log: nextLog.slice(0, 8),
  };
}

function applyDamage(target, rawDamage) {
  const absorbed = Math.min(target.shield, rawDamage);
  const remainingDamage = rawDamage - absorbed;

  return {
    ...target,
    shield: Math.max(0, target.shield - rawDamage),
    health: clamp(target.health - remainingDamage, 0, target.combat.maxHealth),
    defending: false,
  };
}

function gainEnergy(fighter, amount) {
  return {
    ...fighter,
    energy: clamp(fighter.energy + amount, 0, fighter.combat.maxEnergy),
  };
}

function enemyDecision(enemy, player) {
  if (enemy.energy >= 45 && player.health <= player.combat.maxHealth * 0.42) {
    return "special";
  }

  if (enemy.health <= enemy.combat.maxHealth * 0.3 && enemy.shield === 0) {
    return "defend";
  }

  if (enemy.energy >= 60 && Math.random() > 0.45) {
    return "special";
  }

  return Math.random() > 0.28 ? "attack" : "defend";
}

function settleWinner(state) {
  if (state.player.health <= 0 && state.opponent.health <= 0) {
    return withLog({ ...state, winner: "draw" }, "Both combat shells collapse. The arena declares a draw.", "system");
  }

  if (state.player.health <= 0) {
    return withLog({ ...state, winner: "opponent" }, `${state.opponent.name} claims the arena.`, "opponent");
  }

  if (state.opponent.health <= 0) {
    return withLog({ ...state, winner: "player" }, `${state.player.name} stands victorious in the arena.`, "player");
  }

  return state;
}

function resolveAction(actorKey, state, action) {
  const targetKey = actorKey === "player" ? "opponent" : "player";
  let actor = { ...state[actorKey] };
  let target = { ...state[targetKey], defending: false };
  let nextState = { ...state };

  if (action === "attack") {
    const damage = randomInt(actor.combat.attackMin, actor.combat.attackMax);
    target = applyDamage(target, damage);
    actor = gainEnergy(actor, 14);
    nextState = withLog(
      nextState,
      `${actor.name} lands a kinetic strike for ${damage} damage.`,
      actorKey,
    );
  }

  if (action === "defend") {
    actor = gainEnergy(actor, 18);
    actor.defending = true;
    actor.shield += actor.combat.shieldStrength;
    nextState = withLog(
      nextState,
      `${actor.name} raises a defense lattice and gains ${actor.combat.shieldStrength} shield.`,
      actorKey,
    );
  }

  if (action === "special") {
    if (actor.energy < 40) {
      actor = gainEnergy(actor, 8);
      nextState = withLog(
        nextState,
        `${actor.name} tries to channel a special move but the core is undercharged.`,
        "system",
      );
    } else {
      const damage = randomInt(actor.combat.specialMin, actor.combat.specialMax);
      actor.energy = clamp(actor.energy - 40, 0, actor.combat.maxEnergy);
      target = applyDamage(target, damage);
      nextState = withLog(
        nextState,
        `${actor.name} unleashes a special protocol for ${damage} damage.`,
        actorKey,
      );
    }
  }

  nextState[actorKey] = actor;
  nextState[targetKey] = target;
  return settleWinner(nextState);
}

export function runTurn(state, playerAction) {
  if (state.winner) {
    return state;
  }

  let nextState = resolveAction("player", state, playerAction);

  if (nextState.winner) {
    return {
      ...nextState,
      round: nextState.round + 1,
      turn: "complete",
    };
  }

  const enemyAction = enemyDecision(nextState.opponent, nextState.player);
  nextState = resolveAction("opponent", nextState, enemyAction);

  return {
    ...nextState,
    round: nextState.round + 1,
    turn: nextState.winner ? "complete" : "player",
  };
}
