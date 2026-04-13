"use client";

import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { brand } from "@/components/config/brand";
import { useTranslations } from "next-intl";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Cpu,
  ShieldCheck,
  BriefcaseBusiness,
} from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function FooterEngineered() {
  const t = useTranslations("footer");
  const YEAR = new Date().getFullYear();
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const footer = document.querySelector("footer");
    if (footer) observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <AnimatePresence>
        {!footerVisible && (
          <motion.div
            initial={{ y: 100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            exit={{ y: 100, x: "-50%", opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed bottom-3 left-14 -translate-x-1/2 z-50"
          >
            <div className="flex h-12 items-center gap-2 rounded-full px-2 border border-white/10 bg-blue-200 dark:bg-white/10 backdrop-blur-2xl shadow-2xl shadow-black/20">
              <Link
                href="/service-request"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 hover:text-white hover:bg-white/10 transition-all duration-300"
                aria-label={t("nav.resources.request")}
                title={t("nav.resources.request")}
              >
                <BriefcaseBusiness size={16} className="text-black/80 dark:text-white/80" />
              </Link>

              <div className="h-6 w-px bg-white/10" />

              <div className="flex items-center justify-center rounded-full">
                <ThemeSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative bg-[#0B0F14] text-white overflow-hidden border-t border-white/5">
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-12">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <Link href="/" className="flex items-center gap-3">
                  <div className="p-2 bg-white border border-white/10 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
                    <Image
                      src={brand.logo.dark}
                      alt={brand.name}
                      width={32}
                      height={32}
                      className="h-8 w-auto"
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xl font-bold tracking-tighter uppercase text-white">
                      {brand.name}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-500">
                      {t("tagline")}
                    </span>
                  </div>
                </Link>

                <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                  {t("description")}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    {t("status")}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <SystemBadge icon={<Cpu size={12} />} text={t("badges.arch")} />
                <SystemBadge icon={<ShieldCheck size={12} />} text={t("badges.secure")} />
              </div>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 gap-8">
              <NavGroup title={t("nav.company.title")}>
                <NavItem href="/about">{t("nav.company.about")}</NavItem>
                <NavItem href="/projects">{t("nav.company.projects")}</NavItem>
                <NavItem href="/services">{t("nav.company.services")}</NavItem>
                <NavItem href="/contact">{t("nav.company.contact")}</NavItem>
              </NavGroup>

              <NavGroup title={t("nav.resources.title")}>
                <NavItem href="/faq">{t("nav.resources.faq")}</NavItem>
                <NavItem href="/service-request">{t("nav.resources.request")}</NavItem>
                <NavItem href="/legal/privacy">{t("nav.resources.privacy")}</NavItem>
              </NavGroup>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-2xl p-6 border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-sm shadow-[0_20px_40px_rgba(0,0,0,0.18)]">
                <h4
                  className="text-[10px] font-mono uppercase tracking-[0.3em] mb-6"
                  style={{ color: brand?.colors?.primary }}
                >
                  {t("contactTitle")}
                </h4>

                <ul className="space-y-4 text-xs font-mono">
                  <ContactItem
                    icon={<Mail size={14} />}
                    text={brand.social.email}
                    href={`mailto:${brand.social.email}`}
                  />
                  <ContactItem
                    icon={<Phone size={14} />}
                    text={brand.social.phoneNumber}
                    href={`tel:${brand.social.phoneNumber}`}
                  />
                  <ContactItem
                    icon={<MapPin size={14} />}
                    text={brand.social.location}
                  />
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                © {YEAR} {brand.name}. {t("rights")}
              </p>

              <div className="h-4 w-px bg-white/10 hidden md:block" />

              <div className="flex gap-4 text-[10px] font-mono text-slate-600">
                <Link href="/legal/privacy" className="hover:text-white transition-colors">
                  {t("nav.resources.privacy")}
                </Link>
                <Link href="/legal/terms" className="hover:text-white transition-colors">
                  {t("nav.resources.terms")}
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2" style={{ color: brand?.colors?.primary }}>
              <Cpu size={10} />
              <span className="text-[9px] font-light uppercase tracking-widest">
                {t("engineered")} {brand.name}
              </span>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
}

function SystemBadge({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-wider text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
      {icon}
      {text}
    </span>
  );
}

function NavGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
        {title}
      </h5>
      <ul className="space-y-3 text-sm text-slate-400">{children}</ul>
    </div>
  );
}

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center gap-1.5 hover:text-white transition-all duration-300"
      >
        <span className="relative">
          {children}
          <span
            className="absolute -bottom-1 left-0 w-0 h-px transition-all group-hover:w-full"
            style={{ backgroundColor: brand?.colors?.primary }}
          />
        </span>
        <ArrowUpRight
          size={12}
          className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
          style={{ color: brand?.colors?.primary }}
        />
      </Link>
    </li>
  );
}

function ContactItem({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
      <span style={{ color: brand?.colors?.primary }}>{icon}</span>
      <span className="truncate">{text}</span>
    </div>
  );

  return href ? (
    <li>
      <a href={href} className="block">
        {content}
      </a>
    </li>
  ) : (
    <li>{content}</li>
  );
}