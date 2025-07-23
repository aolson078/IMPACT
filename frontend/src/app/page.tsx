export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center text-center gap-8 py-32">
      <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-br from-primary-500 to-primary-700 bg-clip-text text-transparent">
        IMPACT Dashboard
      </h1>
      <p className="max-w-xl text-primary-200/90">
        Kick‑start your regenerative finance front‑end with a sleek, dark,
        black‑and‑purple interface – infused with a touch of cosmic whimsy.
      </p>
      <div className="flex gap-4">
        <button className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 ring-2 ring-primary-700/50 transition">
          Get Started
        </button>
        <button className="px-6 py-3 rounded-xl ring-1 ring-primary-600 hover:bg-primary-600/10 transition">
          Documentation
        </button>
      </div>
    </section>
  );
}
