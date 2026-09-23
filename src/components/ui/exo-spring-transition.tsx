"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useTransition, animated } from "@react-spring/web";
import { Cpu, RefreshCw } from "lucide-react";

export function ExoSpringTransition() {
  const ref = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [items, set] = useState<string[]>([
    "Software Development",
    "Business Intelligence",
    "Exo Server OS",
  ]);

  const transitions = useTransition(items, {
    from: {
      opacity: 0,
      height: 0,
      innerHeight: 0,
      transform: "perspective(600px) rotateX(0deg)",
      color: "#64748B",
    },
    enter: [
      { opacity: 1, height: 56, innerHeight: 56 },
      { transform: "perspective(600px) rotateX(180deg)", color: "#00E5FF" },
      { transform: "perspective(600px) rotateX(0deg)" },
    ],
    leave: [{ color: "#1E3A8A" }, { innerHeight: 0 }, { opacity: 0, height: 0 }],
    update: { color: "#FFFFFF" },
  });

  const reset = useCallback(() => {
    ref.current.forEach(clearTimeout);
    ref.current = [];
    set([]);
    ref.current.push(
      setTimeout(
        () => set(["Software Development", "Business Intelligence", "Exo Server OS"]),
        1000
      )
    );
    ref.current.push(
      setTimeout(() => set(["Software Development", "Exo Server OS"]), 4500)
    );
    ref.current.push(
      setTimeout(
        () =>
          set([
            "Software Development",
            "Enterprise Data Analytics",
            "Exo Server OS",
          ]),
        8000
      )
    );
  }, []);

  useEffect(() => {
    const timer1 = setTimeout(() => set(["Software Development", "Exo Server OS"]), 4500);
    const timer2 = setTimeout(
      () =>
        set([
          "Software Development",
          "Enterprise Data Analytics",
          "Exo Server OS",
        ]),
      8000
    );
    ref.current.push(timer1, timer2);

    return () => {
      ref.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="w-full glass-card p-6 sm:p-8 rounded-2xl border border-[#00E5FF]/20 shadow-[0_15px_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-widest">
          <Cpu className="w-4 h-4" /> DYNAMIC SYSTEM WORKLOAD
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-1.5 text-[11px] font-mono text-[#64748B] hover:text-[#00E5FF] transition-colors focus:outline-none"
          title="Re-trigger Transition Animation"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>RESTART CYCLE</span>
        </button>
      </div>

      <div className="flex flex-col gap-2 min-h-[190px]">
        {transitions(({ innerHeight, ...rest }, item) => (
          <animated.div
            className="cursor-pointer select-none rounded-xl bg-[#070B14]/80 border border-white/10 hover:border-[#00E5FF]/40 px-4 flex items-center font-mono text-sm font-semibold tracking-wider uppercase shadow-md transition-shadow"
            style={rest as unknown as React.CSSProperties}
            onClick={reset}
          >
            <animated.div
              style={{ overflow: "hidden", height: innerHeight as unknown as number }}
              className="flex items-center gap-3 w-full"
            >
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
              <span>{item}</span>
            </animated.div>
          </animated.div>
        ))}
      </div>

      <p className="text-[10px] font-mono text-[#64748B] mt-4 text-center">
        Click items to trigger weightless 3D transition cycle
      </p>
    </div>
  );
}
