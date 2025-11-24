"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { createClient } from "@/lib/supabase/client";
import {
    LayoutDashboard,
    Users,
    Plane,
    Hotel,
    Ticket,
    Tags,
    ReceiptText,
    Bell,
    Settings,
    Globe,
    BarChart3,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { brand } from "@/components/config/brand";

/* -------------------- Types -------------------- */
type NavItem = {
    href: string;
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
};

type NavSection = {
    title: string;
    items: NavItem[];
};

type SidebarProps = {
    /** Active locale, e.g. "en" | "ar" */
    locale: string;
    /** If true, renders the mobile top bar + drawer */
    mobile?: boolean;
    /** Controlled collapsed state (desktop). If omitted, internal state will be used. */
    collapsed?: boolean;
    /** Setter for collapsed (desktop). If omitted, internal state will be used. */
    setCollapsed?: React.Dispatch<React.SetStateAction<boolean>>;
    /** Optional className for outer <aside> or mobile bar */
    className?: string;
};

/* -------------------- Utils -------------------- */
const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

const PRIMARY = brand?.colors?.primary ?? "#241c72";
const ACCENT = brand?.colors?.accent ?? "#F99417";

const RING =
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40";

/* Build sections from locale */


/* -------------------- Component -------------------- */
export default function Sidebar({
    locale,
    mobile = false,
    collapsed: collapsedProp,
    setCollapsed: setCollapsedProp,
    className,
}: SidebarProps) {


    const [role, setRole] = React.useState<string | null>(null);

    React.useEffect(() => {
        async function getRole() {

            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) return setRole(null);

            const { data } = await supabase
                .from("app_users")
                .select("role")
                .eq("id", user.id)
                .single();

            setRole(data?.role || null);
        }

        getRole();
    }, []);


    const buildSections = (locale: string): NavSection[] => [
        {
            title: "Overview",
            items: [{ href: `/${locale}/dashboard`, label: "Dashboard", icon: LayoutDashboard }],
        },
        {
            title: "Operations",
            items: [
                { href: `/${locale}/dashboard/pilgrims`, label: "Pilgrims", icon: Users },
                { href: `/${locale}/dashboard/bookings`, label: "Bookings", icon: Plane },
                { href: `/${locale}/dashboard/housing`, label: "Housing", icon: Plane },
                { href: `/${locale}/dashboard/trips`, label: "Trips", icon: Users },
                { href: `/${locale}/dashboard/tickets`, label: "Tickets", icon: Ticket },
                { href: `/${locale}/dashboard/requests`, label: "Requests", icon: Ticket },
                { href: `/${locale}/dashboard/hajj`, label: "Hajj", icon: Plane },
                { href: `/${locale}/dashboard/packages`, label: "Packages", icon: Plane },
            ],
        },
        {
            title: "Inventory",
            items: [
                { href: `/${locale}/dashboard/hotels`, label: "Hotels", icon: Hotel },
                { href: `/${locale}/dashboard/flight`, label: "Flights", icon: Plane },
                { href: `/${locale}/dashboard/prices`, label: "Prices", icon: Tags },
            ],
        },
        {
            title: "Finance",
            items: [
                { href: `/${locale}/dashboard/finance`, label: "Financial Overview", icon: BarChart3 },
                { href: `/${locale}/dashboard/invoices`, label: "Invoices", icon: ReceiptText },
            ],
        },
        {
            title: "System",
            items: [
                role === "admin"
                    ? { href: `/${locale}/dashboard/users`, label: "Users", icon: Users }
                    : null,
                { href: `/${locale}/dashboard/notifications`, label: "Notifications", icon: Bell },
                { href: `/${locale}/dashboard/settings`, label: "Settings", icon: Settings },
            ].filter(Boolean) as NavItem[],
        },
    ];

    const pathname = usePathname();

    const sections = React.useMemo(() => buildSections(locale), [locale, role]);
    const flatItems = React.useMemo(() => sections.flatMap((s) => s.items), [sections]);

    /* Collapsed state (controlled or local) */
    const [collapsedLocal, setCollapsedLocal] = React.useState(false);
    const isControlled = typeof collapsedProp === "boolean" && !!setCollapsedProp;
    const collapsed = isControlled ? (collapsedProp as boolean) : collapsedLocal;
    const setCollapsed = isControlled ? (setCollapsedProp as typeof setCollapsedLocal) : setCollapsedLocal;



    /* Persist collapsed preference */
    React.useEffect(() => {
        try {
            const saved = localStorage.getItem("hg_sidebar_collapsed");
            if (saved === "1") setCollapsed(true);
        } catch { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    React.useEffect(() => {
        try {
            localStorage.setItem("hg_sidebar_collapsed", collapsed ? "1" : "0");
        } catch { }
    }, [collapsed]);

    /* Section open/closed state (auto open section containing current route) */
    const [openMap, setOpenMap] = React.useState<Record<string, boolean>>({});
    React.useEffect(() => {
        const initial: Record<string, boolean> = Object.fromEntries(
            sections.map((s) => [
                s.title,
                s.items.some(({ href }) => pathname?.startsWith(href)),
            ])
        );
        setOpenMap(initial);
    }, [sections, pathname]);

    const toggleSection = (title: string) =>
        setOpenMap((m) => ({ ...m, [title]: !m[title] }));

    const isActive = (href: string) =>
        pathname === href ||
        (pathname?.startsWith(href) && href !== `/(dashboard)`);


    /* Mobile drawer */
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    /* -------------------- MOBILE TOP BAR + DRAWER -------------------- */
    /* -------------------- MOBILE TOP BAR + DRAWER (NEW) -------------------- */
    if (mobile) {
        return (
            <>
                {/* Top bar */}
                <div
                    className={cx(
                        "flex h-14 w-full items-center justify-between border-b",
                        "bg-white/90 dark:bg-neutral-900/90 backdrop-blur",
                        "px-4 shadow-sm",
                        className
                    )}
                >
                    {/* Menu button */}
                    <button
                        onClick={() => setDrawerOpen(true)}
                        className="flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-700 transition"
                    >
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: PRIMARY }} />
                        Menu
                    </button>

                    {/* Brand */}
                    <div className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
                        Hoggaan Dashboard
                    </div>

                    <div className="w-8" /> {/* empty spacer for balance */}
                </div>

                {/* Drawer overlay */}
                {drawerOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setDrawerOpen(false)}
                        />

                        {/* Drawer Panel */}
                        <div
                            className={cx(
                                "absolute left-0 top-0 h-full w-[82%] max-w-xs",
                                "bg-white dark:bg-neutral-900 shadow-2xl border-r border-slate-200 dark:border-neutral-700",
                                "grid grid-rows-[auto_1fr_auto] animate-slideIn"
                            )}
                        >
                            {/* Header */}
                            <div className="flex h-14 items-center justify-between border-b border-slate-200 dark:border-neutral-800 px-4">
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                    <Globe size={17} />
                                    <span className="text-sm font-medium">Navigation</span>
                                </div>
                                <button
                                    onClick={() => setDrawerOpen(false)}
                                    className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Body */}
                            <div className="overflow-y-auto px-3 py-2 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-400/40">
                                {sections.map((section) => {
                                    const openSection = openMap[section.title];
                                    return (
                                        <div key={section.title}>
                                            <button
                                                onClick={() => toggleSection(section.title)}
                                                className="flex w-full items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 px-2 py-1.5 hover:bg-slate-100/40 dark:hover:bg-white/10 rounded"
                                            >
                                                <span>{section.title}</span>
                                                <span>{openSection ? "−" : "+"}</span>
                                            </button>

                                            <div
                                                className={cx(
                                                    "transition-all overflow-hidden",
                                                    openSection ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                                                )}
                                            >
                                                {section.items.map(({ href, label, icon: Icon }) => {
                                                    const active = isActive(href);
                                                    return (
                                                        <Link
                                                            key={href}
                                                            href={href}
                                                            onClick={() => setDrawerOpen(false)}
                                                            className={cx(
                                                                "flex items-center gap-3 rounded-lg px-3 py-2 mt-1 transition",
                                                                active
                                                                    ? "bg-indigo-600 text-white"
                                                                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-neutral-800"
                                                            )}
                                                        >
                                                            <Icon size={18} />
                                                            <span>{label}</span>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Footer */}
                            <div className="border-t border-slate-200 dark:border-neutral-800 p-3 bg-slate-50 dark:bg-neutral-800">
                                <button
                                    onClick={() => setCollapsed((v) => !v)}
                                    className="w-full flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm bg-slate-200 dark:bg-neutral-700 text-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-neutral-600 transition"
                                >
                                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                                    {collapsed ? "Expand menu" : "Collapse menu"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }


    /* -------------------- DESKTOP SIDEBAR -------------------- */
    return (
        <aside
            className={cx(
                "flex h-dvh shrink-0 flex-col overflow-hidden",
                "border-r border-white/10",
                "bg-gradient-to-b from-[#1b1750] via-[#0b1020] to-[#1b1750] text-slate-100",
                "transition-[width] duration-300",
                collapsed ? "w-16" : "w-[18rem]",
                className
            )}
            style={{ willChange: "width" }}
            aria-label="Sidebar Navigation"
        >
            {/* Brand (sticky) */}
            <div className="sticky top-0 z-10 flex h-16 items-center border-b border-white/10 bg-white/5 px-4 backdrop-blur-sm">
                <div className={cx("flex items-center gap-3", collapsed && "justify-center w-full")}>
                    <Image
                        src={brand.logo.light}
                        alt="Hoggaan"
                        width={collapsed ? 28 : 36}
                        height={28}
                        className="h-7 w-auto"
                        priority
                    />
                    {!collapsed && (
                        <div className="leading-tight">
                            <div className="text-[11px] uppercase tracking-wider text-slate-400">Hoggaan</div>
                            <div className="text-sm font-semibold text-white">Dashboard</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Body */}
            <div className="min-h-0 flex-1">
                {/* Collapsed: icon rail */}
                {collapsed ? (
                    <nav className="h-full overflow-y-auto p-2 [scrollbar-width:thin] [scrollbar-color:#334155_transparent]">
                        <div className="flex flex-col items-center gap-1.5">
                            {flatItems.map(({ href, label, icon: Icon }) => {
                                const active = isActive(href);
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        aria-current={active ? "page" : undefined}
                                        title={label}
                                        className={cx(
                                            "group relative flex h-10 w-10 items-center justify-center rounded-lg transition",
                                            active ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"
                                        )}
                                    >
                                        <Icon size={18} />
                                        {/* Tooltip */}
                                        <span className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                                            {label}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>
                ) : (
                    // Expanded: sections accordion
                    <nav className="h-full overflow-y-auto p-3 [scrollbar-width:thin] [scrollbar-color:#334155_transparent]">
                        {sections.map((section) => {
                            const openSection = openMap[section.title];
                            return (
                                <div key={section.title} className="mb-3">
                                    <button
                                        onClick={() => toggleSection(section.title)}
                                        className={cx(
                                            "flex w-full items-center justify-between rounded-md px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400",
                                            "hover:bg-white/5",
                                            RING
                                        )}
                                        aria-expanded={openSection}
                                        aria-controls={`section-${section.title}`}
                                    >
                                        <span>{section.title}</span>
                                        <span className="text-slate-400">{openSection ? "−" : "+"}</span>
                                    </button>

                                    <div
                                        id={`section-${section.title}`}
                                        className={cx(
                                            "overflow-hidden transition-all duration-300",
                                            openSection ? "max-h-[1000px] opacity-100 mt-1" : "max-h-0 opacity-0"
                                        )}
                                    >
                                        {section.items.map(({ href, label, icon: Icon }) => {
                                            const active = isActive(href);
                                            return (
                                                <Link
                                                    key={href}
                                                    href={href}
                                                    aria-current={active ? "page" : undefined}
                                                    className={cx(
                                                        "group relative mb-1.5 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition",
                                                        active ? "bg-white/10 text-white" : "text-slate-200 hover:bg-white/5"
                                                    )}
                                                >
                                                    {/* Active rail */}
                                                    <span
                                                        className={cx(
                                                            "absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full",
                                                            active ? "bg-indigo-400" : "bg-transparent"
                                                        )}
                                                    />
                                                    <Icon
                                                        size={18}
                                                        className={active ? "text-white" : "text-slate-400 group-hover:text-slate-200"}
                                                    />
                                                    <span className="font-medium">{label}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </nav>
                )}
            </div>

            {/* Footer controls */}
            <div className="sticky bottom-0 bg-white/5 p-3 backdrop-blur-sm border-t border-white/10">
                <div className={cx("flex items-center gap-2", collapsed && "flex-col")}>
                    <button
                        onClick={() => setCollapsed((v) => !v)}
                        className={cx(
                            "inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 text-sm text-black",
                            "bg-[--hg-accent] hover:opacity-95",
                            collapsed && "w-full",
                            RING
                        )}
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                        title={collapsed ? "Expand" : "Collapse"}
                        style={{ ["--hg-accent" as any]: ACCENT }}
                    >
                        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                        {!collapsed && <span>Collapse</span>}
                    </button>
                </div>
            </div>
        </aside>
    );
}
