"use client";

import { useMemo, useRef, useState } from "react";
import { brand } from "@/components/config/brand";
import {
  budgetRanges,
  engagementModels,
  preferredContactMethods,
  projectModes,
  projectStages,
  requestedServices,
  serviceRequestSteps,
  serviceSpecificOptions,
} from "@/lib/ServiceRequest/serviceRequestSteps";
import {
  initialServiceRequestFormData,
  type ServiceRequestFormData,
} from "@/lib/ServiceRequest/serviceRequestModel";
import ServiceRequestStepper from "./ServiceRequestStepper";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function ServiceRequestForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ServiceRequestFormData>(
    initialServiceRequestFormData
  );
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [stepError, setStepError] = useState<string>("");

  const primaryColor = brand?.colors?.primary || "#f97316";
  const currentStep = serviceRequestSteps.find((item) => item.id === step);

  const formRef = useRef<HTMLDivElement | null>(null);
  
  const selectedScopeOptions = useMemo(() => {
    switch (formData.requestedService) {
      case "Website Development":
        return serviceSpecificOptions.website;
      case "System Development (SaaS)":
        return serviceSpecificOptions.saas;
      case "Web Application Development":
        return serviceSpecificOptions.webapp;
      case "Mobile App Development":
        return serviceSpecificOptions.mobile;
      case "Consulting":
        return serviceSpecificOptions.consulting;
      case "AI Applications":
        return serviceSpecificOptions.ai;
      default:
        return [];
    }
  }, [formData.requestedService]);

  function updateField<K extends keyof ServiceRequestFormData>(
    key: K,
    value: ServiceRequestFormData[K]
  ) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (stepError) setStepError("");
  }

  function toggleRequirement(value: string) {
    setFormData((prev) => {
      const exists = prev.selectedRequirements.includes(value);
      return {
        ...prev,
        selectedRequirements: exists
          ? prev.selectedRequirements.filter((item) => item !== value)
          : [...prev.selectedRequirements, value],
      };
    });
  }

  function validateStep(current: number): string {
    if (current === 1) {
      if (!formData.fullName.trim()) return "Full name is required.";
      if (!formData.email.trim()) return "Email address is required.";
      return "";
    }

    if (current === 2) {
      if (!formData.requestedService.trim())
        return "Please select the requested service.";
      return "";
    }

    if (current === 3) {
      if (!formData.projectSummary.trim())
        return "Project summary is required.";
      return "";
    }

    if (current === 6) {
      if (!formData.budgetRange.trim())
        return "Please select an estimated budget range.";
      return "";
    }

    if (current === 7) {
      if (!formData.preferredContactMethod.trim())
        return "Please select the preferred contact method.";
      if (!formData.confirmAccuracy)
        return "You must confirm that the information is accurate.";
      return "";
    }

    return "";
  }

  function nextStep() {
    const error = validateStep(step);
    if (error) {
      setStepError(error);
      return;
    }

    if (step < serviceRequestSteps.length) {
      setStep((prev) => prev + 1);
      setStepError("");
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function prevStep() {
    if (step > 1) {
      setStep((prev) => prev - 1);
      setStepError("");
     formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const error = validateStep(7);
    if (error) {
      setStepError(error);
      return;
    }

    try {
      setSubmitState("submitting");
      setStepError("");

      // Replace with your real API call
      // const res = await fetch("/api/service-request", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });
      //
      // if (!res.ok) throw new Error("Failed to submit request");

      await new Promise((resolve) => setTimeout(resolve, 1200));

      setSubmitState("success");
    } catch (error) {
      console.error(error);
      setSubmitState("error");
      setStepError("Something went wrong while submitting the request.");
    }
  }

  return (
    <section ref={formRef} className="min-h-screen bg-[#f8f9fb] dark:bg-[#080809] flex flex-col lg:flex-row">
      <ServiceRequestStepper currentStep={step} />
        
      <main className="flex-1 p-6 lg:p-5 xl:p-10 overflow-y-auto" >
        <div className="max-w-5xl mx-auto" >
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-slate-900 text-white dark:bg-white dark:text-black">
                Phase {String(step).padStart(2, "0")}
              </span>
              <div className="h-[1px] flex-1 bg-slate-200 dark:bg-white/10" />
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
              {currentStep?.title}
            </h1>

            <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400 max-w-2xl">
              {currentStep?.description}
            </p>
          </header>

          {submitState === "success" ? (
            <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-8 md:p-10">
              <div
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl mb-5"
                style={{ backgroundColor: `${primaryColor}18`, color: primaryColor }}
              >
                ✓
              </div>

              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                Service request submitted
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400 max-w-2xl">
                Your request has been recorded successfully. We can now review the
                scope, timeline, and budget information before responding with the
                appropriate next step.
              </p>

              <button
                type="button"
                onClick={() => {
                  setFormData(initialServiceRequestFormData);
                  setStep(1);
                  setSubmitState("idle");
                  setStepError("");
                }}
                className="mt-8 px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black text-sm font-medium"
              >
                Start Another Request
              </button>
            </div>
          ) : (
            <form  onSubmit={handleSubmit} className="space-y-12">
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  <Field
                    label="Full Name"
                    value={formData.fullName}
                    onChange={(v) => updateField("fullName", v)}
                    placeholder="John Doe"
                    required
                  />
                  <Field
                    label="Company"
                    value={formData.companyName}
                    onChange={(v) => updateField("companyName", v)}
                    placeholder="Acme Corp"
                  />
                  <Field
                    label="Job Title"
                    value={formData.jobTitle}
                    onChange={(v) => updateField("jobTitle", v)}
                    placeholder="Founder / Manager / Director"
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(v) => updateField("email", v)}
                    placeholder="john@example.com"
                    required
                  />
                  <Field
                    label="Phone / WhatsApp"
                    value={formData.phone}
                    onChange={(v) => updateField("phone", v)}
                    placeholder="+966 ..."
                  />
                  <Field
                    label="Location"
                    value={formData.country}
                    onChange={(v) => updateField("country", v)}
                    placeholder="City, Country"
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div>
                    <SectionLabel label="Requested Service" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {requestedServices.map((service) => (
                        <SelectionCard
                          key={service}
                          label={service}
                          active={formData.requestedService === service}
                          onClick={() => updateField("requestedService", service)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                    <SelectField
                      label="Project Mode"
                      value={formData.projectMode}
                      onChange={(v) => updateField("projectMode", v)}
                      options={[...projectModes]}
                    />
                    <SelectField
                      label="Existing System"
                      value={formData.hasExistingSystem}
                      onChange={(v) => updateField("hasExistingSystem", v)}
                      options={["Yes", "No", "Partially"]}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-10">
                  <Field
                    label="Project Name"
                    value={formData.projectName}
                    onChange={(v) => updateField("projectName", v)}
                    placeholder="Project or platform name"
                  />

                  <TextAreaField
                    label="Project Summary"
                    value={formData.projectSummary}
                    onChange={(v) => updateField("projectSummary", v)}
                    placeholder="Describe the project clearly..."
                    required
                  />

                  <TextAreaField
                    label="Main Business Goal"
                    value={formData.businessGoal}
                    onChange={(v) => updateField("businessGoal", v)}
                    placeholder="What should this system achieve?"
                  />

                  <TextAreaField
                    label="Problem To Solve"
                    value={formData.problemToSolve}
                    onChange={(v) => updateField("problemToSolve", v)}
                    placeholder="What challenge should this solve?"
                  />

                  <Field
                    label="Target Users"
                    value={formData.targetUsers}
                    onChange={(v) => updateField("targetUsers", v)}
                    placeholder="Customers, staff, managers, admins..."
                  />

                  <TextAreaField
                    label="Reference Links / Similar Systems"
                    value={formData.referenceLinks}
                    onChange={(v) => updateField("referenceLinks", v)}
                    placeholder="Share links if any"
                  />
                </div>
              )}

              {step === 4 && (
                <div className="space-y-10">
                  <div>
                    <SectionLabel label="Core Requirements" />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <BooleanToggle
                        label="Admin Dashboard"
                        value={formData.needsAdminDashboard}
                        onChange={(v) => updateField("needsAdminDashboard", v)}
                      />
                      <BooleanToggle
                        label="User Auth"
                        value={formData.needsAuthentication}
                        onChange={(v) => updateField("needsAuthentication", v)}
                      />
                      <BooleanToggle
                        label="Payments"
                        value={formData.needsPayments}
                        onChange={(v) => updateField("needsPayments", v)}
                      />
                      <BooleanToggle
                        label="API Integration"
                        value={formData.needsApiIntegrations}
                        onChange={(v) => updateField("needsApiIntegrations", v)}
                      />
                      <BooleanToggle
                        label="Mobile App"
                        value={formData.needsMobileApp}
                        onChange={(v) => updateField("needsMobileApp", v)}
                      />
                      <BooleanToggle
                        label="Multilingual"
                        value={formData.needsMultilingual}
                        onChange={(v) => updateField("needsMultilingual", v)}
                      />
                      <BooleanToggle
                        label="Analytics"
                        value={formData.needsAnalytics}
                        onChange={(v) => updateField("needsAnalytics", v)}
                      />
                      <BooleanToggle
                        label="File Upload"
                        value={formData.needsFileUpload}
                        onChange={(v) => updateField("needsFileUpload", v)}
                      />
                    </div>
                  </div>

                  {!!selectedScopeOptions.length && (
                    <div>
                      <SectionLabel label="Service-Specific Scope" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedScopeOptions.map((item) => {
                          const active = formData.selectedRequirements.includes(item);

                          return (
                            <SelectionCard
                              key={item}
                              label={item}
                              active={active}
                              onClick={() => toggleRequirement(item)}
                              compact
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 5 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  <Field
                    label="Desired Start Date"
                    type="date"
                    value={formData.desiredStartDate}
                    onChange={(v) => updateField("desiredStartDate", v)}
                  />
                  <Field
                    label="Desired Launch Window"
                    value={formData.desiredLaunchWindow}
                    onChange={(v) => updateField("desiredLaunchWindow", v)}
                    placeholder="e.g. 6-8 weeks / Q3 / flexible"
                  />
                  <SelectField
                    label="Project Stage"
                    value={formData.projectStage}
                    onChange={(v) => updateField("projectStage", v)}
                    options={[...projectStages]}
                  />
                  <SelectField
                    label="Branding Ready?"
                    value={formData.hasBrandingReady}
                    onChange={(v) => updateField("hasBrandingReady", v)}
                    options={["Yes", "No", "Partially"]}
                  />
                  <SelectField
                    label="Content Ready?"
                    value={formData.hasContentReady}
                    onChange={(v) => updateField("hasContentReady", v)}
                    options={["Yes", "No", "Partially"]}
                  />
                  <SelectField
                    label="Technical Docs Ready?"
                    value={formData.hasTechnicalDocsReady}
                    onChange={(v) => updateField("hasTechnicalDocsReady", v)}
                    options={["Yes", "No", "Partially"]}
                  />
                </div>
              )}

              {step === 6 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  <SelectField
                    label="Estimated Budget Range"
                    value={formData.budgetRange}
                    onChange={(v) => updateField("budgetRange", v)}
                    options={[...budgetRanges]}
                    required
                  />
                  <SelectField
                    label="Preferred Engagement Model"
                    value={formData.engagementModel}
                    onChange={(v) => updateField("engagementModel", v)}
                    options={[...engagementModels]}
                  />
                  <SelectField
                    label="Ongoing Support Needed?"
                    value={formData.needsOngoingSupport}
                    onChange={(v) => updateField("needsOngoingSupport", v)}
                    options={["Yes", "No", "Maybe"]}
                  />
                </div>
              )}

              {step === 7 && (
                <div className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ReviewItem label="Full Name" value={formData.fullName} />
                    <ReviewItem label="Company" value={formData.companyName} />
                    <ReviewItem
                      label="Requested Service"
                      value={formData.requestedService}
                    />
                    <ReviewItem label="Project Mode" value={formData.projectMode} />
                    <ReviewItem label="Project Name" value={formData.projectName} />
                    <ReviewItem label="Budget Range" value={formData.budgetRange} />
                    <ReviewItem
                      label="Launch Window"
                      value={formData.desiredLaunchWindow}
                    />
                    <ReviewItem
                      label="Project Stage"
                      value={formData.projectStage}
                    />
                  </div>

                  <TextAreaField
                    label="Additional Notes"
                    value={formData.additionalNotes}
                    onChange={(v) => updateField("additionalNotes", v)}
                    placeholder="Anything else we should know?"
                  />

                  <SelectField
                    label="Preferred Contact Method"
                    value={formData.preferredContactMethod}
                    onChange={(v) => updateField("preferredContactMethod", v)}
                    options={[...preferredContactMethods]}
                    required
                  />

                  <label className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] px-4 py-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.confirmAccuracy}
                      onChange={(e) =>
                        updateField("confirmAccuracy", e.target.checked)
                      }
                      className="mt-1"
                    />
                    <span className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                      I confirm that the information provided is accurate to the
                      best of my knowledge.
                    </span>
                  </label>
                </div>
              )}

              {stepError ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                  {stepError}
                </div>
              ) : null}

              <div className="pt-12 flex items-center justify-between border-t border-slate-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={step === 1 || submitState === "submitting"}
                  className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors disabled:opacity-0"
                >
                  Back
                </button>

                {step < serviceRequestSteps.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="group relative flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-medium overflow-hidden transition-all hover:pr-10"
                  >
                    <span>Continue</span>
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitState === "submitting"}
                    className="group relative flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-medium overflow-hidden transition-all hover:pr-10 disabled:opacity-70"
                  >
                    <span>
                      {submitState === "submitting"
                        ? "Submitting..."
                        : "Initialize Project"}
                    </span>
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </main>
    </section>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <p className="mb-4 text-[11px] uppercase tracking-widest font-bold text-slate-400">
      {label}
    </p>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className=" group">
      <label className="text-[11px] uppercase tracking-widest font-bold text-slate-400 group-focus-within:text-orange-500 transition-colors">
        {label}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-slate-200 dark:border-white/10 py-3 text-md text-slate-900 dark:text-white outline-none focus:border-orange-500 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
      />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2 group">
      <label className="text-[11px] uppercase tracking-widest font-bold text-slate-400 group-focus-within:text-orange-500 transition-colors">
        {label}
      </label>
      <textarea
        rows={5}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-slate-200 dark:border-white/10 py-3 text-base text-slate-900 dark:text-white outline-none focus:border-orange-500 transition-all resize-none placeholder:text-slate-300 dark:placeholder:text-slate-700"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <div className="space-y-2 group">
      <label className="text-[11px] uppercase tracking-widest font-bold text-slate-400">
        {label}
      </label>
      <select
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-slate-200 dark:border-white/10 py-3 text-lg text-slate-900 dark:text-white outline-none focus:border-orange-500 transition-all"
      >
        <option value="">Select</option>
        {options.map((item) => (
          <option key={item} value={item} className="text-slate-900">
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

function SelectionCard({
  label,
  active,
  onClick,
  compact = false,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border text-left transition-all ${
        compact ? "p-5" : "p-6"
      } ${
        active
          ? "bg-white dark:bg-white/5 border-orange-500 shadow-lg"
          : "bg-transparent border-slate-200 dark:border-white/5 hover:border-slate-400"
      }`}
    >
      <div
        className={`h-2 w-2 rounded-full mb-4 ${
          active ? "bg-orange-500" : "bg-slate-300"
        }`}
      />
      <p className="font-medium text-slate-900 dark:text-white">{label}</p>
    </button>
  );
}

function BooleanToggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`flex flex-col p-4 rounded-xl border transition-all text-left ${
        value
          ? "bg-orange-500/5 border-orange-500"
          : "bg-slate-50 dark:bg-white/[0.02] border-transparent"
      }`}
    >
      <span className="text-[10px] uppercase tracking-tighter text-slate-500 mb-1">
        Status
      </span>
      <span className={`text-xs font-bold ${value ? "text-orange-500" : "text-slate-400"}`}>
        {label}
      </span>
    </button>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] px-4 py-4">
      <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm text-slate-900 dark:text-white">
        {value || "--"}
      </p>
    </div>
  );
}