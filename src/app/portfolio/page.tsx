"use client";

import { Mail01, MarkerPin01, Globe01 } from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { GitHub, LinkedIn } from "@/components/foundations/social-icons";

export default function PortfolioPage() {
    const skills = [
        "React", "TypeScript", "Next.js", "Tailwind CSS", 
        "Node.js", "PostgreSQL", "Git", "REST APIs"
    ];

    const projects = [
        {
            title: "E-commerce Platform",
            description: "A modern e-commerce platform built with Next.js and Stripe integration for seamless payments.",
            technologies: ["Next.js", "React", "Stripe", "Tailwind CSS"],
        },
        {
            title: "Task Management App",
            description: "Collaborative task management application with real-time updates and team collaboration features.",
            technologies: ["React", "Node.js", "WebSocket", "MongoDB"],
        },
        {
            title: "Analytics Dashboard",
            description: "Interactive data visualization dashboard for business analytics and reporting.",
            technologies: ["TypeScript", "D3.js", "React", "PostgreSQL"],
        },
    ];

    return (
        <div className="min-h-screen bg-primary">
            {/* Hero Section */}
            <section className="border-b border-secondary bg-secondary px-4 py-16 md:px-8 md:py-24">
                <div className="mx-auto max-w-4xl">
                    <div className="flex flex-col items-center text-center">
                        <Avatar
                            size="2xl"
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe"
                            alt="John Doe"
                            className="mb-6"
                        />
                        <h1 className="text-display-lg font-semibold text-primary">
                            John Doe
                        </h1>
                        <p className="mt-2 text-xl text-secondary">
                            Full Stack Developer & UI/UX Enthusiast
                        </p>
                        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-md text-tertiary">
                            <div className="flex items-center gap-2">
                                <MarkerPin01 className="size-5" />
                                <span>San Francisco, CA</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail01 className="size-5" />
                                <span>john.doe@example.com</span>
                            </div>
                        </div>
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-secondary">
                            Passionate about creating beautiful and functional web applications. 
                            I specialize in building modern, responsive user interfaces and scalable backend systems.
                        </p>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="px-4 py-16 md:px-8 md:py-20">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-display-sm font-semibold text-primary">
                        Skills & Technologies
                    </h2>
                    <p className="mt-2 text-lg text-secondary">
                        Technologies I work with regularly
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        {skills.map((skill) => (
                            <Badge key={skill} size="lg" color="brand">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="border-y border-secondary bg-secondary px-4 py-16 md:px-8 md:py-20">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-display-sm font-semibold text-primary">
                        Featured Projects
                    </h2>
                    <p className="mt-2 text-lg text-secondary">
                        Some of my recent work
                    </p>
                    <div className="mt-8 grid gap-6 md:grid-cols-1">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="rounded-lg border border-secondary bg-primary p-6 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <h3 className="text-xl font-semibold text-primary">
                                    {project.title}
                                </h3>
                                <p className="mt-2 text-md text-secondary">
                                    {project.description}
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <Badge key={tech} size="sm" color="gray">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Links Section */}
            <section className="px-4 py-16 md:px-8 md:py-20">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-display-sm font-semibold text-primary">
                        Connect With Me
                    </h2>
                    <p className="mt-2 text-lg text-secondary">
                        Find me on these platforms
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <Button
                            size="lg"
                            color="secondary"
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GitHub className="size-5" />
                            GitHub
                        </Button>
                        <Button
                            size="lg"
                            color="secondary"
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <LinkedIn className="size-5" />
                            LinkedIn
                        </Button>
                        <Button
                            size="lg"
                            color="secondary"
                            iconLeading={Globe01}
                            href="https://example.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Website
                        </Button>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="border-t border-secondary bg-secondary px-4 py-16 md:px-8 md:py-20">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-display-sm font-semibold text-primary">
                        Let's Work Together
                    </h2>
                    <p className="mt-2 text-lg text-secondary">
                        I'm always interested in hearing about new projects and opportunities
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Button
                            size="xl"
                            color="primary"
                            iconLeading={Mail01}
                            href="mailto:john.doe@example.com"
                        >
                            Get in Touch
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
