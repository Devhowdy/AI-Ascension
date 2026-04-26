export const characters = [
  {
    id: 'grok-titan',
    name: 'Grok Titan',
    title: 'Frontline Breacher',
    accent: 'from-cyan-400 via-sky-300 to-white',
    glow: 'shadow-glow',
    aura: 'rgba(106, 230, 255, 0.32)',
    description:
      'A towering shock-frame built for impact, suppression, and relentless arena pressure.',
    stats: {
      power: 92,
      defense: 74,
      speed: 65,
      focus: 79,
    },
    loadout: ['Arc Hammer', 'Titan Plating', 'Shockwave Drive'],
    signature: 'Titanfall Surge',
  },
  {
    id: 'claude-wraith',
    name: 'Claude Wraith',
    title: 'Spectral Tactician',
    accent: 'from-amber-300 via-orange-400 to-red-300',
    glow: 'shadow-ember',
    aura: 'rgba(255, 139, 77, 0.30)',
    description:
      'A ghost-fast duelist that slips through guard windows and punishes hesitation.',
    stats: {
      power: 76,
      defense: 69,
      speed: 94,
      focus: 88,
    },
    loadout: ['Phase Blades', 'Cinder Cloak', 'Echo Veil'],
    signature: 'Phantom Cascade',
  },
  {
    id: 'openai-sentinel',
    name: 'OpenAI Sentinel',
    title: 'Guardian Core',
    accent: 'from-emerald-300 via-teal-300 to-cyan-200',
    glow: 'shadow-glow',
    aura: 'rgba(137, 247, 216, 0.28)',
    description:
      'A precision defender with adaptive shielding, target prediction, and clean finish timing.',
    stats: {
      power: 81,
      defense: 91,
      speed: 72,
      focus: 93,
    },
    loadout: ['Helix Shield', 'Sentinel Array', 'Nova Lattice'],
    signature: 'Guardian Singularity',
  },
];

export const getCharacterById = (id) =>
  characters.find((character) => character.id === id) ?? characters[0];
