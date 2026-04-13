// /components/service-request/ServiceRequestStepper.tsx
"use client";

import { serviceRequestSteps } from "@/lib/ServiceRequest/serviceRequestSteps";
import { brand } from "@/components/config/brand";

type Props = {
  currentStep: number;
};

export default function ServiceRequestStepper({ currentStep }: Props) {
  const primaryColor = brand?.colors?.primary || "#f97316";

  return (
    <aside className="w-full lg:w-80 flex flex-col border-r border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-[#0c0c0e]/50 backdrop-blur-xl">
      <div className="p-8 border-b border-slate-200 dark:border-white/[0.08]">
        <h3 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-1">
          Project Initialization
        </h3>
        <p className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Service Intake
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto p-6 space-y-2">
        {serviceRequestSteps.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <div
              key={step.id}
              className={`group relative flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${
                isActive 
                  ? "bg-white dark:bg-white/[0.05] shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-none" 
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              {/* Active Indicator Bar */}
              {isActive && (
                <div 
                  className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
                  style={{ backgroundColor: primaryColor }}
                />
              )}

              <div className="flex flex-col">
                <span className={`text-[10px] font-mono mb-1 ${isActive ? "text-orange-500" : "text-slate-500"}`}>
                  0{step.id} —
                </span>
                <p className={`text-sm font-medium transition-colors ${
                  isActive ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"
                }`}>
                  {step.shortTitle}
                </p>
                {isActive && (
                  <p className="mt-1 text-[12px] leading-relaxed text-slate-500 dark:text-slate-400 animate-in fade-in slide-in-from-top-1">
                    {step.description}
                  </p>
                )}
              </div>
              
              {isCompleted && (
                <div className="ml-auto">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}