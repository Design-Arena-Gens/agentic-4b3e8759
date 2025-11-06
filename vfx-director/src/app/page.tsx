"use client";

import { useMemo, useState } from "react";
import { generatePipelinePlan } from "@/lib/pipeline";

const samplePrompts = [
  "Monsoon-drenched Mumbai alley at midnight, chase between a cybernetic detective and a rogue drone, neon reflections, handheld camera.",
  "Mythic temple courtyard at dawn with a fire priestess summoning a phoenix of embers while rain cools the stone, sweeping steadicam.",
  "Desert battlefield at dusk, armored warrior vs sandstorm titan, dramatic dolly push with arcane lightning.",
];

export default function Home() {
  const [prompt, setPrompt] = useState(samplePrompts[0]);
  const [rawInput, setRawInput] = useState(samplePrompts[0]);

  const plan = useMemo(
    () => generatePipelinePlan((rawInput || prompt).trim()),
    [prompt, rawInput],
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-zinc-900 to-slate-950 px-6 py-16 text-zinc-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <header className="flex flex-col gap-4">
          <span className="text-sm uppercase tracking-[0.4em] text-emerald-300/70">
            VFX निर्देश & पाइपलाइन
          </span>
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            सिनेमॅटिक VFX दिग्दर्शन सूट — Marathi भावना, Hollywood precision.
          </h1>
          <p className="max-w-3xl text-pretty text-lg text-zinc-300">
            Input मध्ये scene mood + लॅन्डस्केप लिहा आणि pipeline supervisor मोड मध्ये
            त्वरित स्टेज-बाय-स्टेज ब्रेकडाउन मिळवा. Output Marathi + English blend मध्ये
            technical clarity सह बनलेले आहे.
          </p>
        </header>

        <section className="grid gap-8 rounded-3xl border border-white/10 bg-zinc-950/50 p-8 shadow-2xl shadow-emerald-500/10">
          <div className="flex flex-col gap-3">
            <label
              htmlFor="scene-input"
              className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200/80"
            >
              Describe Scene / दृश्य वर्णन करा
            </label>
            <textarea
              id="scene-input"
              rows={5}
              value={rawInput}
              onChange={(event) => setRawInput(event.target.value)}
              placeholder="Example: Monsoon-drenched Mumbai alley at midnight..."
              className="rounded-xl border border-emerald-400/20 bg-black/40 px-4 py-3 text-base leading-7 text-zinc-100 placeholder:text-zinc-500 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
            />
            <div className="flex flex-wrap gap-3">
              {samplePrompts.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setPrompt(preset);
                    setRawInput(preset);
                  }}
                  className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100 transition hover:border-emerald-200/70 hover:bg-emerald-400/20"
                >
                  {preset.split(",")[0]}…
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-emerald-400/10 p-4 text-sm text-emerald-100">
            टिप: Input बदलताच pipeline auto-update होईल. विशिष्ट तांत्रिक निर्देश हवे असल्यास
            Marathi मध्ये उल्लेख करा उदा. “simulate blazing fire with heavy turbulence”.
          </div>
        </section>

        <section className="grid gap-8">
          <div className="grid gap-4 rounded-3xl border border-white/10 bg-black/50 p-8 backdrop-blur">
            <h2 className="text-2xl font-semibold text-emerald-200">
              Scene Summary / मेटाडेटा
            </h2>
            <p className="text-zinc-300">{plan.summary}</p>
            <dl className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <MetadataItem label="Location" value={plan.metadata.location} />
              <MetadataItem label="Mood" value={plan.metadata.mood} />
              <MetadataItem label="Time" value={plan.metadata.timeOfDay} />
              <MetadataItem label="Camera" value={plan.metadata.cameraStyle} />
              <MetadataItem label="Characters" value={plan.metadata.characters} />
              <MetadataItem label="FX Palette" value={plan.metadata.fxPalette} />
            </dl>
          </div>

          <div className="grid gap-6">
            {plan.stages.map((stage) => (
              <article
                key={stage.id}
                className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-black/70 via-zinc-950/70 to-emerald-950/30 p-8 shadow-lg shadow-black/40"
              >
                <header className="mb-4 flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-[0.4em] text-emerald-300/80">
                    {stage.id.toUpperCase()}
                  </span>
                  <h3 className="text-2xl font-semibold text-emerald-100">
                    {stage.title}
                  </h3>
                  <p className="text-zinc-300">{stage.description}</p>
                </header>
                <ul className="mb-6 grid gap-2">
                  {stage.steps.map((step) => (
                    <li
                      key={step}
                      className="flex gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-zinc-100"
                    >
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-300" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                  {stage.technical.map((item) => (
                    <div
                      key={`${stage.id}-${item.label}`}
                      className="rounded-xl border border-emerald-300/20 bg-emerald-400/10 p-4 text-sm"
                    >
                      <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
                        {item.label}
                      </p>
                      <p className="mt-2 text-emerald-100">{item.value}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <RenderCard plan={plan} />
            <ExportCard plan={plan} />
          </div>
        </section>
      </div>
    </main>
  );
}

type CardProps = {
  plan: ReturnType<typeof generatePipelinePlan>;
};

function RenderCard({ plan }: CardProps) {
  const { render } = plan;
  return (
    <article className="rounded-3xl border border-cyan-300/20 bg-cyan-500/10 p-8 text-cyan-100 backdrop-blur">
      <h3 className="text-xl font-semibold uppercase tracking-[0.3em]">
        Render Specs
      </h3>
      <dl className="mt-6 grid gap-4 text-sm">
        <MetadataItem label="Resolution" value={render.resolution} tone="cyan" />
        <MetadataItem label="Frame Rate" value={render.frameRate} tone="cyan" />
        <MetadataItem label="Samples" value={render.samples} tone="cyan" />
        <MetadataItem label="Renderer" value={render.renderer} tone="cyan" />
        <MetadataItem label="Passes" value={render.passes} tone="cyan" />
        <MetadataItem label="Color Space" value={render.colorSpace} tone="cyan" />
        <MetadataItem label="File Naming" value={render.fileNaming} tone="cyan" />
      </dl>
    </article>
  );
}

function ExportCard({ plan }: CardProps) {
  const { export: exportPlan } = plan;
  return (
    <article className="rounded-3xl border border-violet-300/20 bg-violet-500/10 p-8 text-violet-100 backdrop-blur">
      <h3 className="text-xl font-semibold uppercase tracking-[0.3em]">
        Final Exports
      </h3>
      <dl className="mt-6 grid gap-4 text-sm">
        <MetadataItem label="Format" value={exportPlan.format} tone="violet" />
        <MetadataItem label="Codec" value={exportPlan.codec} tone="violet" />
        {exportPlan.deliverables.map((deliverable) => (
          <MetadataItem
            key={deliverable}
            label="Deliverable"
            value={deliverable}
            tone="violet"
          />
        ))}
        <MetadataItem
          label="Optimization"
          value={exportPlan.optimization}
          tone="violet"
        />
      </dl>
    </article>
  );
}

type MetadataProps = {
  label: string;
  value: string;
  tone?: "emerald" | "cyan" | "violet";
};

function MetadataItem({ label, value, tone = "emerald" }: MetadataProps) {
  const toneMap: Record<NonNullable<MetadataProps["tone"]>, string> = {
    emerald: "text-emerald-100",
    cyan: "text-cyan-100",
    violet: "text-violet-100",
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <dt className="text-xs uppercase tracking-[0.35em] text-zinc-400">
        {label}
      </dt>
      <dd className={`mt-2 text-sm font-medium ${toneMap[tone]}`}>{value}</dd>
    </div>
  );
}
