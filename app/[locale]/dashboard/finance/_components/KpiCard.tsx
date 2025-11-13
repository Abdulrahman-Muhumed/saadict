"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import React, { useEffect } from "react";

const money = (v: number | string = 0) =>
  Number(v || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

function AnimatedNumber({ value }: { value: number }) {
  const motionValue = useMotionValue(0);
  const display = useTransform(motionValue, (v) => `$${money(v)}`);

  useEffect(() => {
    const controls = animate(motionValue, Number(value || 0), {
      duration: 0.8,
      ease: "circOut",
    });
    return () => controls.stop();
  }, [value]);

  return <motion.span>{display}</motion.span>;
}

export default function KpiCard({
  title,
  value,
  icon: Icon,
  trend,
  sparkline,
  color = "text-cyan-400",
}: {
  title: string;
  value: number;
  icon: React.ComponentType<any>;
  trend?: number;
  sparkline?: number[];
  color?: string;
}) {
  const isPositive = trend == null ? null : trend >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-white/10 bg-white dark:bg-slate-950 p-5 shadow-lg"
    >
      <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span>{title}</span>
      </div>
      <div className={`text-3xl font-bold tracking-tight text-foreground ${color}`}>
        <AnimatedNumber value={value} />
      </div>
      {trend != null && (
        <div className="mt-3 flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
              isPositive
                ? "bg-green-500/10 text-green-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {Math.abs(trend).toFixed(1)}%
          </span>
          {sparkline && (
            <Sparkline data={sparkline} color={isPositive ? "#34d399" : "#f87171"} />
          )}
        </div>
      )}
    </motion.div>
  );
}

/* --- Mini Sparkline --- */
function Sparkline({
  data = [],
  width = 100,
  height = 30,
  color = "#06b6d4",
}: {
  data?: number[];
  width?: number;
  height?: number;
  color?: string;
}) {
  if (data.length <= 1) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const norm = (v: number, i: number) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / (max - min || 1)) * height;
    return [x, y];
  };
  const path = data
    .map((v, i) => norm(v, i))
    .map(([x, y], i) => (i ? `L${x},${y}` : `M${x},${y}`))
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="opacity-80"
    >
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
