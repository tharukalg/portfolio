"use client";

import React, { useState } from "react";
import { IoCopyOutline, IoCheckmarkCircle } from "react-icons/io5";
import { FiExternalLink, FiGlobe, FiCpu, FiAward, FiCheck } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { personalDetails, publishedResearch, education } from "@/data";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 gap-6 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  titleClassName,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const leftLists = ["Flutter", "NestJS", "React.js", "AWS", ".NET Core"];
  const rightLists = ["TypeScript", "Supabase", "MariaDB", "Python", "TensorFlow"];

  const handleCopy = () => {
    navigator.clipboard.writeText(personalDetails.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className={cn(
        "retro-card p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden bg-white text-stone-900",
        className
      )}
    >
      <div>
        {/* Category / Subheader Tag */}
        <div className="inline-block px-2.5 py-0.5 rounded-md bg-[#F4EFE6] border border-stone-800 text-[11px] font-mono font-bold text-stone-800 uppercase mb-3 shadow-[1px_1px_0px_#1c1917]">
          {description}
        </div>

        {/* Title */}
        <div className="font-sans text-xl sm:text-2xl font-black text-stone-900 leading-snug tracking-tight">
          {title}
        </div>

        {/* CARD 1: Production Impact at Savinda & Brandora */}
        {id === 1 && (
          <div className="mt-5 flex flex-col space-y-4">
            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-medium">
              Delivered 5 production-grade applications serving 400+ employees across manufacturing operations, real-time floor monitoring, and a high-concurrency 600+ daily orders platform at Savinda Graphic Systems.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#FAF6F0] border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917]">
                <div className="text-xl font-black text-[#FF5722]">5 Apps</div>
                <div className="text-xs font-bold text-stone-700">In Production</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF6F0] border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917]">
                <div className="text-xl font-black text-sky-600">400+ Users</div>
                <div className="text-xs font-bold text-stone-700">Enterprise Scale</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF6F0] border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] col-span-2 sm:col-span-1">
                <div className="text-xl font-black text-amber-600">600+ Daily</div>
                <div className="text-xs font-bold text-stone-700">Meal Orders Scaled</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {["Flutter", "NestJS", "MariaDB", "Angular", "Docker", "REST APIs"].map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-white border border-stone-800 text-xs font-mono font-bold text-stone-800 shadow-[1px_1px_0px_#1c1917]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CARD 2: Western Province, Sri Lanka - Retro Radar / Coordinates */}
        {id === 2 && (
          <div className="mt-4 flex flex-col justify-between flex-1">
            <div className="my-3 p-4 rounded-xl bg-[#F4EFE6] border-2 border-stone-900 shadow-[3px_3px_0px_#1c1917] flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full border-2 border-stone-900 bg-white relative flex items-center justify-center shadow-[2px_2px_0px_#1c1917]">
                <div className="w-10 h-10 rounded-full border border-stone-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-orange-600 absolute animate-ping" />
                <span className="w-2 h-2 rounded-full bg-stone-900 absolute" />
              </div>
              
              <div className="mt-3 font-mono text-xs text-stone-900 font-bold">
                6.9271° N, 79.8612° E
              </div>
              <div className="text-[11px] font-mono text-stone-600 mt-0.5">
                Western Province, Sri Lanka (UTC+5:30)
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-800 pt-3 border-t-2 border-stone-900/10 font-bold">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                Remote & Hybrid Ready
              </span>
              <span className="font-mono text-orange-600">Global Flexibility</span>
            </div>
          </div>
        )}

        {/* CARD 3: Tech Stack Matrix */}
        {id === 3 && (
          <div className="mt-5 flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              {leftLists.concat(rightLists).map((item, i) => (
                <span
                  key={i}
                  className="py-1 px-2.5 text-xs rounded-lg bg-[#FAF6F0] border-2 border-stone-900 text-stone-900 font-mono font-bold shadow-[2px_2px_0px_#1c1917] hover:bg-amber-200 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CARD 4: IEEE Research & SLIIT Honours */}
        {id === 4 && (
          <div className="mt-4 flex flex-col space-y-3">
            <div className="p-3.5 rounded-xl bg-amber-100 border-2 border-stone-900 text-xs text-stone-800 space-y-2 shadow-[2px_2px_0px_#1c1917]">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-900 font-mono">
                  <FiAward className="text-orange-600" />
                  ★ IEEE PUBLISHED AUTHOR
                </span>
                <a
                  href={publishedResearch.conferenceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-orange-600 hover:underline flex items-center gap-1"
                >
                  Xplore <FiExternalLink />
                </a>
              </div>
              <div className="font-bold text-stone-900 line-clamp-2">
                {publishedResearch.title}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-700 px-1 font-bold">
              <span>SLIIT — BSc (Hons) IT (SE)</span>
              <span className="font-mono bg-white px-2 py-0.5 rounded border border-stone-800 shadow-[1px_1px_0px_#1c1917]">
                CGPA 3.34
              </span>
            </div>
          </div>
        )}

        {/* CARD 6: Interactive Call to Action / Instant Copy Email */}
        {id === 6 && (
          <div className="flex flex-col items-center justify-center text-center py-4 w-full">
            <p className="text-stone-700 text-xs sm:text-sm max-w-sm mb-4 font-medium">
              Have a project, role, or venture idea in mind? Let&apos;s build high-performance software.
            </p>

            <button
              onClick={handleCopy}
              className="retro-button-orange w-full max-w-xs py-3 px-4 text-xs sm:text-sm font-mono flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <IoCheckmarkCircle className="text-white text-lg" />
                  <span>COPIED: tharukalg@gmail.com</span>
                </>
              ) : (
                <>
                  <IoCopyOutline className="text-white" />
                  <span>Copy: tharukalg@gmail.com</span>
                </>
              )}
            </button>

            <div className="mt-3 text-[11px] font-mono text-stone-600 font-medium">
              Direct: <strong className="text-stone-900">tharukalg@gmail.com</strong> • <strong className="text-stone-900">+94 70 459 4487</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
