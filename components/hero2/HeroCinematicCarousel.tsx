"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Using lucide-react for icons

// --- DATA ---
// A simple array of image objects for the carousel
const IMAGES = [
    { id: 1, src: "/home/hero_bg1.png", alt: "Mountain Summit with Clear Sky" },
    { id: 2, src: "/home/hero_bg2.png", alt: "Sunset over a Tropical Beach" },
    { id: 3, src: "/home/hero_bg3.png", alt: "Forest Path in Autumn Colors" },
];

type HeroCinematicCarouselProps = {
    // We'll rename this prop to better reflect the new effect
    cinematicPerspective?: boolean;
    autoPlayInterval?: number;
};

// --- FRAMER MOTION VARIANTS ---
// The key to the 3D cinematic effect.
const cinematicVariants: Variants = {
    // Current slide (center)
    center: {
        x: "0%",
        scale: 1,
        opacity: 1,
        rotateY: 0,
        zIndex: 10,
        transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] }, // Custom ease for a punchy feel
    },
    // Slide entering from the right (will move to center)
    enter: (direction: number) => ({
        x: direction > 0 ? "100%" : "-100%",
        scale: 0.85,
        opacity: 0.4,
        rotateY: direction > 0 ? -15 : 15, // 3D rotation effect
        zIndex: 5,
    }),
    // Slide exiting to the left (moving out of view)
    exit: (direction: number) => ({
        x: direction < 0 ? "100%" : "-100%",
        scale: 0.85,
        opacity: 0.4,
        rotateY: direction < 0 ? -15 : 15,
        zIndex: 5,
        transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] },
    }),
};

// --- HELPER FUNCTIONS ---
// Function to wrap index around array length for infinite loop
const wrap = (min: number, max: number, v: number) => {
    const range = max - min;
    return ((((v - min) % range) + range) % range) + min;
};

// --- THE COMPONENT ---
export default function HeroCinematicCarousel({
    cinematicPerspective = true,
    autoPlayInterval = 5000,
}: HeroCinematicCarouselProps) {
    // [page, direction]
    const [[page, direction], setPage] = useState([0, 0]);

    // We use the wrap function to get the index of the currently visible image
    const imageIndex = wrap(0, IMAGES.length, page);

    const paginate = useCallback((newDirection: number) => {
        setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
    }, []);

    // Auto-play effect
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (autoPlayInterval > 0) {
            timer = setInterval(() => {
                paginate(1);
            }, autoPlayInterval);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [autoPlayInterval, paginate]);


    return (
        <div
            className="relative aspect-[7/5] w-full overflow-hidden rounded-3xl border border-slate-200 bg-white dark:bg-neutral-900"
            // Use perspective on the container for the 3D effect to work
            style={{
                perspective: cinematicPerspective ? 1200 : 'none',
                contain: "layout paint",
                contentVisibility: "auto"
            }}
        >
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={page}
                    custom={direction}
                    variants={cinematicVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    // Class and style for the slide container
                    className="absolute inset-0"
                    style={{
                        // Ensures the image fills the slide without overflow
                        width: '100%',
                        height: '100%',
                        // Important for the 3D rotation effect
                        backfaceVisibility: cinematicPerspective ? 'hidden' : 'visible'
                    }}
                >
                    <Image
                        src={IMAGES[imageIndex].src}
                        alt={IMAGES[imageIndex].alt}
                        fill
                        className="object-cover transition-opacity duration-300"
                        priority={imageIndex === 0} // Only prioritize the first image for LCP
                        sizes="(min-width:1024px) 48rem, 100vw"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="absolute inset-0 flex items-center justify-between p-4 z-20 pointer-events-none">
                <Button onClick={() => paginate(-1)} aria-label="Previous slide">
                    <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button onClick={() => paginate(1)} aria-label="Next slide">
                    <ChevronRight className="w-6 h-6" />
                </Button>
            </div>

            {/* Visual Overlay (optional, for cinematic mood) */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                    // Subtle radial gradient for depth and focus on the center
                    background: `radial-gradient(60% 60% at 70% 30%, transparent 30%, #00000033 100%)`,
                }}
            />
        </div>
    );
}

// --- NAVIGATION BUTTON COMPONENT (Tailwind CSS) ---
// Extracted to keep the main component clean
const Button = ({ children, onClick, 'aria-label': ariaLabel }: { children: React.ReactNode, onClick: () => void, 'aria-label': string }) => (
    <motion.button
        onClick={onClick}
        aria-label={ariaLabel}
        className="p-3 bg-white/30 backdrop-blur-sm rounded-full text-white hover:bg-white/50 transition-colors pointer-events-auto shadow-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        {children}
    </motion.button>
);

// --- EXAMPLE USAGE ---
/* // In your main page component:
<HeroCinematicCarousel 
  cinematicPerspective={true} 
  autoPlayInterval={4000} // Optional: 4 second auto-play
/>
*/