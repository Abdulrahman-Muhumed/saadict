"use client";

import { motion } from "framer-motion";

export function BarChart({
  data = [],
  labels = [],
  color = "bg-cyan-500",
}: {
  data: number[];
  labels: string[];
  color?: string;
}) {
  const max = Math.max(...data, 1);

  return (
    <div className="flex h-48 items-end justify-between gap-2 text-neutral-500">
      {data.map((value, i) => (
        <div key={i} className="group relative flex h-full flex-1 flex-col items-center justify-end">
          <div className="absolute -top-6 hidden group-hover:block bg-neutral-950 px-2 py-1 rounded-md text-xs text-neutral-200">
            ${value.toLocaleString()}
          </div>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${Math.max(2, (value / max) * 100)}%` }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
            className={`w-full rounded-t-md ${color} hover:opacity-80 transition-opacity`}
          />
          <span className="mt-2 text-xs">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

export function DonutChart({
  values = [],
  colors = [],
  size = 120,
  strokeWidth = 14,
}: {
  values: number[];
  colors: string[];
  size?: number;
  strokeWidth?: number;
}) {
  const total = Math.max(1, values.reduce((s, v) => s + Number(v || 0), 0));
  const r = (size - strokeWidth) / 2;
  const c = size / 2;
  let accumulatedAngle = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      {values.map((v, i) => {
        const angle = (v / total) * 360;
        const largeArcFlag = angle > 180 ? 1 : 0;
        const x1 = c + r * Math.cos((accumulatedAngle * Math.PI) / 180);
        const y1 = c + r * Math.sin((accumulatedAngle * Math.PI) / 180);
        accumulatedAngle += angle;
        const x2 = c + r * Math.cos((accumulatedAngle * Math.PI) / 180);
        const y2 = c + r * Math.sin((accumulatedAngle * Math.PI) / 180);

        return (
          <motion.path
            key={i}
            d={`M ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`}
            fill="transparent"
            stroke={colors[i] || "#404040"}
            strokeWidth={strokeWidth}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
          />
        );
      })}
    </svg>
  );
}
