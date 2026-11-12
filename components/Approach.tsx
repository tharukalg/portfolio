"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { FiCheck } from "react-icons/fi";
import { useLiveProgress } from "./arcade/useLiveProgress";

const phases = [
  {
    phase: "01",
    title: "Architecture & Optimization",
    badge: "SCHEMA & SCALE",
    tone: "ink",
    desc: "Translating business requirements into robust database schemas (MariaDB, PostgreSQL, Supabase), designing clean REST/gRPC endpoints, and applying strategic SQL indexing to prevent production bottlenecks.",
    points: ["Database schema & entity modeling", "Query performance & indexing strategy", "API & microservice contracts"],
  },
  {
    phase: "02",
    title: "Full-Stack & Mobile Build",
    badge: "FLUTTER & NESTJS",
    tone: "petrol",
    desc: "Writing clean, maintainable code across Flutter/React Native for fluid mobile UX, and robust backend services with NestJS and .NET Core. Strict adherence to BLoC architecture, type safety, and real-time synchronization.",
    points: ["Reactive state management (BLoC/Provider)", "Clean Architecture & SOLID principles", "Enterprise transactional logic"],
  },
  {
    phase: "03",
    title: "Deployment, IoT & Scale",
    badge: "AWS & DOCKER",
    tone: "verm",
    desc: "Containerizing services with Docker, deploying to AWS (IoT Core, DynamoDB, Lambda) or GCP, orchestrating CI/CD workflows, and fine-tuning telemetry to ensure zero downtime under high transaction volumes.",
    points: ["Serverless & edge deployment", "IoT hardware & Arduino telemetry", "Automated CI/CD build pipelines"],
  },
] as const;

const TONES = {
  ink: "bg-ink text-paper",
  petrol: "bg-petrol text-paper",
  verm: "bg-verm text-ink",
};

function PhaseCard({
  item,
  i,
  progress,
}: {
  item: (typeof phases)[number];
  i: number;
  progress: MotionValue<number>;
}) {
  // each card shrinks and dims slightly as the next one slides over it
  const start = i / phases.length;
  const scale = useTransform(progress, [start, 1], [1, 1 - (phases.length - 1 - i) * 0.05]);
  const muted = item.tone === "ink";

  return (
    <div className="sticky" style={{ top: `calc(6.5rem + ${i * 1.75}rem)` }}>
      <motion.article
        style={{ scale }}
        className={`origin-top rounded-[2rem] p-7 sm:p-10 lg:p-12 motion-reduce:!transform-none ${TONES[item.tone]}`}
      >
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className={`display text-[clamp(5rem,12vw,6rem)] leading-[0.8] ${muted ? "text-verm" : ""}`}>
              {item.phase}
            </span>
            <p className={`mt-4 font-mono text-xs font-bold ${muted ? "text-paper/70" : ""}`}>{item.badge}</p>
          </div>
          <div className="lg:col-span-8">
            <h3 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-[1.05] tracking-tight">
              {item.title}
            </h3>
            <p className={`mt-4 max-w-[60ch] leading-relaxed ${muted ? "text-paper/75" : "font-medium"}`}>{item.desc}</p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-3">
              {item.points.map((p) => (
                <li
                  key={p}
                  className={`flex items-start gap-2.5 rounded-2xl p-4 text-sm font-semibold ${
                    muted ? "bg-ink-2" : "bg-ink/10"
                  }`}
                >
                  <FiCheck className="mt-0.5 shrink-0" strokeWidth={3} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Approach() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollYProgress = useLiveProgress(ref, ["start", 0], ["end", 1]);

  return (
    <section id="approach" className="relative mx-auto max-w-[88rem] gutter py-24 sm:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 data-reveal="skew" className="section-title">
          How I <span className="stroke-text">Ship</span>
        </h2>
        <p data-reveal="fade" className="max-w-[44ch] text-mute">
          How I architect, engineer, and ship resilient software from initial database design to
          enterprise-scale deployment.
        </p>
      </div>

      <div ref={ref} className="mt-14 space-y-8">
        {phases.map((item, i) => (
          <PhaseCard key={item.phase} item={item} i={i} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
