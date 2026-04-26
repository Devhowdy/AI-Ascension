import { motion } from 'framer-motion';

function ArenaEffects() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-[18%] h-48 w-48 -translate-x-1/2 rounded-full bg-cyan-300/12 blur-3xl"
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[18%] left-[12%] h-40 w-40 rounded-full bg-orange-400/10 blur-3xl"
        animate={{ y: [-10, 10, -10], opacity: [0.22, 0.45, 0.22] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
      />
      <motion.div
        className="arena-ring absolute left-1/2 top-[58%] h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
      />
    </div>
  );
}

export default ArenaEffects;
