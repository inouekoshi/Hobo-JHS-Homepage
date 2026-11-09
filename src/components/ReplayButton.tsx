"use client";

import type { ReactNode } from "react";
import { OP_REPLAY_EVENT } from "@/lib/event";

/** ロゴを押すとオープニングをもう一度見られる */
export default function ReplayButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="replay"
      aria-label="保々中学校 新成人同窓会 2027（オープニングをもう一度再生）"
      onClick={() => window.dispatchEvent(new CustomEvent(OP_REPLAY_EVENT))}
      style={{ display: "inline-block", transition: "transform .2s ease" }}
    >
      {children}
    </button>
  );
}
