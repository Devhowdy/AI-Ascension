import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="arena-shell min-h-screen overflow-hidden">
      <section className="relative isolate min-h-screen">
        <div className="absolute inset-0 arena-backdrop" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(5,7,13,0.94)_20%,rgba(5,7,13,0.68)_55%,rgba(5,7,13,0.88)_100%)]" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-6 pb-10 pt-6 lg:px-10">
          <header className="flex items-center justify-between">
            <div>
              <p className="font-display text-sm uppercase tracking-[0.6em] text-cyan-100/70">
                AI Battle Arena
              </p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/55">
              V1 Prototype
            </div>
          </header>

          <div className="grid items-end gap-12 pb-8 pt-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.8fr)] lg:pb-12">
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-sm uppercase tracking-[0.5em] text-cyan-100/70"
              >
                Storm-lit tactical duels
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mt-6 font-display text-[clamp(3.7rem,11vw,8.8rem)] uppercase leading-[0.9] tracking-[0.08em] text-white"
              >
                AI Battle
                <br />
                Arena
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-6 max-w-xl text-lg leading-7 text-white/72 md:text-xl"
              >
                Enter a ruined neon battleground where original AI warriors clash
                in a cinematic prototype built for momentum, contrast, and tactical
                spectacle.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-10 flex flex-col gap-4 sm:flex-row"
              >
                <Link
                  to="/select"
                  className="inline-flex items-center justify-center rounded-full border border-cyan-200/30 bg-cyan-200/12 px-8 py-4 font-display text-sm uppercase tracking-[0.35em] text-white transition hover:border-cyan-100/55 hover:bg-cyan-200/18"
                >
                  Enter Arena
                </Link>
                <a
                  href="#overview"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 font-display text-sm uppercase tracking-[0.35em] text-white/75 transition hover:border-white/20 hover:text-white"
                >
                  View Protocol
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="hero-arena relative mx-auto h-[420px] w-full max-w-[520px] lg:h-[560px]"
            >
              <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(120,243,255,0.16),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(0,0,0,0.25)_30%,rgba(0,0,0,0.65)_100%)] shadow-arena" />
              <div className="absolute inset-0 rounded-[2rem] bg-grid-fade bg-[size:44px_44px] opacity-25" />
              <div className="absolute left-[10%] right-[10%] top-14 h-32 rounded-full bg-cyan-200/12 blur-3xl" />
              <div className="absolute inset-x-[16%] bottom-14 h-16 rounded-full border border-cyan-300/20 bg-cyan-300/10 blur-sm" />
              <div className="absolute inset-x-[6%] bottom-[8%] h-48 rounded-full border border-cyan-300/15" />
              <motion.div
                className="absolute left-[16%] bottom-20 h-[56%] w-[24%] rounded-t-[80px] rounded-b-[30px] bg-gradient-to-b from-orange-200/85 to-orange-400/15"
                animate={{ y: [0, -8, 0], rotate: [0, 1.5, 0] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute right-[16%] bottom-20 h-[56%] w-[24%] rounded-t-[80px] rounded-b-[30px] bg-gradient-to-b from-cyan-100/85 to-cyan-400/15"
                animate={{ y: [0, -10, 0], rotate: [0, -1.8, 0] }}
                transition={{ repeat: Infinity, duration: 3.1, ease: "easeInOut" }}
              />
              <div className="absolute inset-x-0 bottom-8 text-center font-display text-lg uppercase tracking-[0.55em] text-white/55">
                Null City Coliseum
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="overview" className="relative border-t border-white/10 bg-black/30">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-3 lg:px-10">
          {[
            {
              title: "Original Warriors",
              body: "Choose between Grok Titan, Claude Wraith, and OpenAI Sentinel, each with their own combat profile.",
            },
            {
              title: "Cinematic UI",
              body: "Responsive panels, animated energy fields, and storm-dark surfaces keep the prototype feeling like a game, not a dashboard.",
            },
            {
              title: "Turn-Based Flow",
              body: "Attack, defend, and fire off special moves with local-state combat logic and a running battle feed.",
            },
          ].map((item) => (
            <div key={item.title} className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/45">
                Protocol
              </p>
              <h2 className="font-display text-2xl uppercase tracking-[0.16em] text-white">
                {item.title}
              </h2>
              <p className="max-w-sm text-lg leading-7 text-white/68">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
