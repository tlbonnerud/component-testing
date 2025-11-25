"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { cx } from "@/utils/cx";

// Animated text component that reveals text on scroll
const AnimatedText = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Floating element with continuous animation
const FloatingElement = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
    <motion.div
        className={cx("absolute rounded-full opacity-40 blur-3xl", className)}
        animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
        }}
        transition={{
            duration: 8,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
        }}
    />
);

// Skill bar component with animation
const SkillBar = ({ skill, level, delay = 0 }: { skill: string; level: number; delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay }}
            className="mb-6"
        >
            <div className="mb-2 flex justify-between">
                <span className="text-lg font-medium text-primary">{skill}</span>
                <span className="text-tertiary">{level}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${level}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay: delay + 0.3, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"
                />
            </div>
        </motion.div>
    );
};

// Project card with hover effects
const ProjectCard = ({
    title,
    description,
    tags,
    delay = 0,
    gradient,
}: {
    title: string;
    description: string;
    tags: string[];
    delay?: number;
    gradient: string;
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60, rotateX: -15 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 60, rotateX: -15 }}
            transition={{ duration: 0.8, delay }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group relative cursor-pointer overflow-hidden rounded-3xl bg-secondary p-8 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
        >
            <div className={cx("absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-20", gradient)} />
            <div className="relative z-10">
                <h3 className="mb-3 text-2xl font-bold text-primary">{title}</h3>
                <p className="mb-6 text-tertiary">{description}</p>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.5 }}
            />
        </motion.div>
    );
};

// Magnetic button effect
const MagneticButton = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef<HTMLButtonElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const btn = ref.current;
        if (!btn) return;

        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    };

    const handleMouseLeave = () => {
        const btn = ref.current;
        if (!btn) return;
        btn.style.transform = "translate(0px, 0px)";
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileTap={{ scale: 0.95 }}
            className={cx(
                "relative overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-violet-500/40 hover:shadow-2xl",
                className
            )}
        >
            <span className="relative z-10">{children}</span>
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
            />
        </motion.button>
    );
};

// Parallax section wrapper
const ParallaxSection = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

    return (
        <div ref={ref} className={cx("relative overflow-hidden", className)}>
            <motion.div style={{ y: smoothY }}>{children}</motion.div>
        </div>
    );
};

// Animated counter component
const AnimatedCounter = ({ value, suffix = "", delay = 0 }: { value: number; suffix?: string; delay?: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            const timeout = setTimeout(() => {
                const duration = 2000;
                const startTime = Date.now();
                
                const animate = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    setDisplayValue(Math.floor(easeOut * value));
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };
                
                requestAnimationFrame(animate);
            }, delay * 1000);
            
            return () => clearTimeout(timeout);
        }
    }, [isInView, value, delay]);

    return (
        <motion.span
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay }}
        >
            {displayValue}{suffix}
        </motion.span>
    );
};

// Glowing orb cursor follower
const GlowingOrb = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <motion.div
            className="pointer-events-none fixed w-96 h-96 rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 blur-3xl z-0"
            animate={{
                x: position.x - 192,
                y: position.y - 192,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
    );
};

export const HomeScreen = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    const skills = [
        { skill: "React / Next.js", level: 95 },
        { skill: "TypeScript", level: 90 },
        { skill: "Node.js", level: 85 },
        { skill: "UI/UX Design", level: 88 },
        { skill: "Motion & Animation", level: 92 },
    ];

    const projects = [
        {
            title: "Digital Art Gallery",
            description: "An immersive 3D gallery experience showcasing digital artworks with WebGL and Three.js.",
            tags: ["Three.js", "WebGL", "React"],
            gradient: "bg-gradient-to-br from-violet-500 to-purple-600",
        },
        {
            title: "AI Music Composer",
            description: "Machine learning powered music generation tool that creates unique compositions.",
            tags: ["Python", "TensorFlow", "React"],
            gradient: "bg-gradient-to-br from-fuchsia-500 to-pink-600",
        },
        {
            title: "Smart Home Dashboard",
            description: "Real-time IoT dashboard with beautiful data visualizations and voice control.",
            tags: ["Next.js", "D3.js", "Socket.io"],
            gradient: "bg-gradient-to-br from-cyan-500 to-blue-600",
        },
    ];

    return (
        <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-primary">
            {/* Progress bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 z-50 h-1 origin-left bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"
                style={{ scaleX }}
            />

            {/* Glowing cursor follower */}
            <GlowingOrb />

            {/* Hero Section */}
            <section className="relative flex min-h-screen items-center justify-center px-6">
                {/* Background gradients */}
                <FloatingElement className="left-1/4 top-1/4 h-96 w-96 bg-violet-500" delay={0} />
                <FloatingElement className="right-1/4 top-1/3 h-80 w-80 bg-fuchsia-500" delay={2} />
                <FloatingElement className="bottom-1/4 left-1/3 h-72 w-72 bg-purple-500" delay={4} />

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />

                <div className="relative z-10 max-w-5xl text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
                    >
                        <motion.div
                            className="mb-6 inline-block rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            ✨ Velkommen til min portfolio
                        </motion.div>

                        <motion.h1
                            className="mb-6 text-5xl font-bold tracking-tight text-primary md:text-7xl lg:text-8xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            Kreativ
                            <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent"> Utvikler </span>
                            <br />
                            & Designer
                        </motion.h1>

                        <motion.p
                            className="mx-auto mb-10 max-w-2xl text-xl text-tertiary md:text-2xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            Jeg skaper unike digitale opplevelser med moderne teknologi,
                            vakre animasjoner og brukervennlig design.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
                        >
                            <MagneticButton>Se mine prosjekter</MagneticButton>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="rounded-full border-2 border-violet-500 px-8 py-4 text-lg font-semibold text-violet-600 transition-colors hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-900/20"
                            >
                                Kontakt meg
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        className="absolute bottom-10 left-1/2 -translate-x-1/2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: [0, 10, 0] }}
                        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
                    >
                        <div className="flex flex-col items-center gap-2 text-tertiary">
                            <span className="text-sm">Scroll ned</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-20">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid gap-8 md:grid-cols-4">
                        {[
                            { value: 50, suffix: "+", label: "Prosjekter fullført" },
                            { value: 5, suffix: "+", label: "År erfaring" },
                            { value: 30, suffix: "+", label: "Fornøyde kunder" },
                            { value: 99, suffix: "%", label: "Kundetilfredshet" },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-5xl font-bold text-primary md:text-6xl">
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={i * 0.2} />
                                </div>
                                <p className="mt-2 text-tertiary">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <ParallaxSection className="py-32">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                        <div>
                            <AnimatedText>
                                <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-violet-500">
                                    Om meg
                                </span>
                            </AnimatedText>
                            <AnimatedText delay={0.1}>
                                <h2 className="mb-6 text-4xl font-bold text-primary md:text-5xl">
                                    Lidenskapelig for å skape
                                    <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent"> magiske </span>
                                    opplevelser
                                </h2>
                            </AnimatedText>
                            <AnimatedText delay={0.2}>
                                <p className="mb-6 text-lg text-tertiary">
                                    Med over 5 års erfaring innen webutvikling og design, kombinerer jeg teknisk
                                    ekspertise med kreativitet for å levere løsninger som ikke bare fungerer,
                                    men som også inspirerer.
                                </p>
                            </AnimatedText>
                            <AnimatedText delay={0.3}>
                                <p className="text-lg text-tertiary">
                                    Jeg tror på at de beste digitale produktene kommer fra et tett samarbeid
                                    mellom design og utvikling - og det er akkurat det jeg tilbyr.
                                </p>
                            </AnimatedText>
                        </div>

                        <div className="relative">
                            <motion.div
                                className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 blur-2xl"
                                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                            <div className="relative rounded-3xl bg-secondary p-8">
                                {skills.map((skill, i) => (
                                    <SkillBar key={skill.skill} skill={skill.skill} level={skill.level} delay={i * 0.1} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </ParallaxSection>

            {/* Projects Section */}
            <section className="py-32">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="mb-16 text-center">
                        <AnimatedText>
                            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-violet-500">
                                Prosjekter
                            </span>
                        </AnimatedText>
                        <AnimatedText delay={0.1}>
                            <h2 className="text-4xl font-bold text-primary md:text-5xl">
                                Utvalgte
                                <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent"> arbeider </span>
                            </h2>
                        </AnimatedText>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project, i) => (
                            <ProjectCard key={project.title} {...project} delay={i * 0.15} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="relative py-32">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent" />
                <div className="relative mx-auto max-w-4xl px-6 text-center">
                    <AnimatedText>
                        <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-violet-500">
                            La oss snakke
                        </span>
                    </AnimatedText>
                    <AnimatedText delay={0.1}>
                        <h2 className="mb-6 text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
                            Har du et spennende
                            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent"> prosjekt? </span>
                        </h2>
                    </AnimatedText>
                    <AnimatedText delay={0.2}>
                        <p className="mx-auto mb-10 max-w-2xl text-xl text-tertiary">
                            Jeg er alltid åpen for nye muligheter og spennende samarbeid.
                            Ta kontakt så finner vi ut hvordan jeg kan hjelpe deg!
                        </p>
                    </AnimatedText>
                    <AnimatedText delay={0.3}>
                        <MagneticButton className="text-xl">
                            ✉️ Send meg en melding
                        </MagneticButton>
                    </AnimatedText>

                    {/* Social links */}
                    <motion.div
                        className="mt-16 flex justify-center gap-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        {["GitHub", "LinkedIn", "Twitter", "Dribbble"].map((social, i) => (
                            <motion.a
                                key={social}
                                href="#"
                                className="text-tertiary transition-colors hover:text-violet-500"
                                whileHover={{ y: -3, scale: 1.1 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 + i * 0.1 }}
                            >
                                {social}
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-secondary py-8">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
                        <p className="text-tertiary">
                            © 2024 Portfolio. Laget med ❤️ og mye kaffe.
                        </p>
                        <motion.p
                            className="text-sm text-tertiary"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            Drevet av Next.js & Framer Motion
                        </motion.p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
