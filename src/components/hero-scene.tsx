
"use client";

import { useEffect, useRef } from "react";

/**
 * Decorative network/system visual for the hero.
 *
 * - Three.js loads lazily after hydration.
 * - Does not block the initial page render.
 * - Respects prefers-reduced-motion.
 * - Responds to pointer movement and container resizing.
 * - Updates its colours when the theme changes.
 * - Cleans up WebGL resources when unmounted.
 * - Remains decorative: no WebGL means no visual, not a page failure.
 */

export function HeroScene({ className }: { className?: string }) {
    const host = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = host.current;

        if (!mount) return;

        let disposed = false;
        let cleanup: (() => void) | undefined;

        async function initializeScene() {
            try {
                const THREE = await import("three");

                // The component may have unmounted while Three.js was loading.
                if (disposed || !host.current) return;

                const element = host.current;

                const cssColor = (name: string, fallback: string) => {
                    const probe = document.createElement("span");

                    probe.style.color = `var(${name})`;
                    probe.style.display = "none";

                    document.body.appendChild(probe);

                    const value = getComputedStyle(probe).color;

                    probe.remove();

                    return value || fallback;
                };

                let renderer: THREE.WebGLRenderer;

                try {
                    renderer = new THREE.WebGLRenderer({
                        antialias: true,
                        alpha: true,
                    });
                } catch {
                    // WebGL is unavailable. This visual is decorative only.
                    return;
                }

                if (disposed) {
                    renderer.dispose();
                    return;
                }

                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

                element.appendChild(renderer.domElement);

                const scene = new THREE.Scene();

                const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);

                camera.position.set(0, 0, 16);

                // --------------------------------------------------
                // NETWORK NODES
                // --------------------------------------------------

                const cols = 9;
                const rows = 6;
                const gap = 2.1;

                const base: {
                    x: number;
                    y: number;
                    z: number;
                    phase: number;
                }[] = [];

                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        base.push({
                            x:
                                (c - (cols - 1) / 2) * gap +
                                (Math.random() - 0.5) * 0.7,

                            y:
                                (r - (rows - 1) / 2) * gap +
                                (Math.random() - 0.5) * 0.7,

                            z: (Math.random() - 0.5) * 2.4,

                            phase: Math.random() * Math.PI * 2,
                        });
                    }
                }

                const nodePositions = new Float32Array(base.length * 3);

                const nodeGeometry = new THREE.BufferGeometry();

                nodeGeometry.setAttribute(
                    "position",
                    new THREE.BufferAttribute(nodePositions, 3),
                );

                const nodeMaterial = new THREE.PointsMaterial({
                    size: 0.14,
                    color: new THREE.Color(
                        cssColor("--foreground", "#888"),
                    ),
                });

                const nodes = new THREE.Points(
                    nodeGeometry,
                    nodeMaterial,
                );

                scene.add(nodes);

                // --------------------------------------------------
                // ACCENT NODES
                // --------------------------------------------------

                const accentIndexes = base
                    .map((_, index) => index)
                    .filter((index) => index % 11 === 0);

                const accentPositions = new Float32Array(
                    accentIndexes.length * 3,
                );

                const accentGeometry = new THREE.BufferGeometry();

                accentGeometry.setAttribute(
                    "position",
                    new THREE.BufferAttribute(accentPositions, 3),
                );

                const accentMaterial = new THREE.PointsMaterial({
                    size: 0.24,
                    color: new THREE.Color(
                        cssColor("--accent", "#c8f000"),
                    ),
                });

                const accentNodes = new THREE.Points(
                    accentGeometry,
                    accentMaterial,
                );

                scene.add(accentNodes);

                // --------------------------------------------------
                // CONNECTION LINES
                // --------------------------------------------------

                const linePairs: [number, number][] = [];

                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        const index = r * cols + c;

                        if (c < cols - 1) {
                            linePairs.push([index, index + 1]);
                        }

                        if (r < rows - 1) {
                            linePairs.push([index, index + cols]);
                        }

                        if (
                            c < cols - 1 &&
                            r < rows - 1 &&
                            (r + c) % 4 === 0
                        ) {
                            linePairs.push([index, index + cols + 1]);
                        }
                    }
                }

                const linePositions = new Float32Array(
                    linePairs.length * 6,
                );

                const lineGeometry = new THREE.BufferGeometry();

                lineGeometry.setAttribute(
                    "position",
                    new THREE.BufferAttribute(linePositions, 3),
                );

                const lineMaterial = new THREE.LineBasicMaterial({
                    color: new THREE.Color(
                        cssColor("--muted-foreground", "#999"),
                    ),
                    transparent: true,
                    opacity: 0.35,
                });

                const lines = new THREE.LineSegments(
                    lineGeometry,
                    lineMaterial,
                );

                scene.add(lines);

                // --------------------------------------------------
                // MOTION AND POINTER
                // --------------------------------------------------

                const reducedMotion = window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                );

                let shouldAnimate = !reducedMotion.matches;

                const pointer = {
                    x: 0,
                    y: 0,
                };

                const onPointerMove = (event: PointerEvent) => {
                    pointer.x =
                        (event.clientX / window.innerWidth - 0.5) * 2;

                    pointer.y =
                        (event.clientY / window.innerHeight - 0.5) * 2;
                };

                const onMotionPreferenceChange = () => {
                    shouldAnimate = !reducedMotion.matches;

                    if (!shouldAnimate) {
                        cancelAnimationFrame(animationFrame);
                        render(0);
                    } else {
                        animationFrame = requestAnimationFrame(animate);
                    }
                };

                if (shouldAnimate) {
                    window.addEventListener(
                        "pointermove",
                        onPointerMove,
                        {passive: true},
                    );
                }

                reducedMotion.addEventListener(
                    "change",
                    onMotionPreferenceChange,
                );

                // --------------------------------------------------
                // RESPONSIVE RESIZING
                // --------------------------------------------------

                const resize = () => {
                    const width = Math.max(element.clientWidth, 1);
                    const height = Math.max(element.clientHeight, 1);

                    renderer.setSize(width, height, false);

                    camera.aspect = width / height;
                    camera.updateProjectionMatrix();
                };

                resize();

                const resizeObserver = new ResizeObserver(resize);

                resizeObserver.observe(element);

                // --------------------------------------------------
                // THEME COLOURS
                // --------------------------------------------------

                const updateThemeColors = () => {
                    nodeMaterial.color.set(
                        cssColor("--foreground", "#888"),
                    );

                    accentMaterial.color.set(
                        cssColor("--accent", "#c8f000"),
                    );

                    lineMaterial.color.set(
                        cssColor("--muted-foreground", "#999"),
                    );

                    if (!shouldAnimate) {
                        render(0);
                    }
                };

                const themeObserver = new MutationObserver(
                    updateThemeColors,
                );

                themeObserver.observe(document.documentElement, {
                    attributes: true,
                    attributeFilter: ["class"],
                });

                // --------------------------------------------------
                // POSITION UPDATES
                // --------------------------------------------------

                const writePositions = (time: number) => {
                    for (let index = 0; index < base.length; index++) {
                        const node = base[index]!;

                        nodePositions[index * 3] = node.x;

                        nodePositions[index * 3 + 1] =
                            node.y +
                            Math.sin(time * 0.0006 + node.phase) * 0.18;

                        nodePositions[index * 3 + 2] = node.z;
                    }

                    nodeGeometry.attributes.position.needsUpdate = true;

                    accentIndexes.forEach((baseIndex, accentIndex) => {
                        accentPositions[accentIndex * 3] =
                            nodePositions[baseIndex * 3]!;

                        accentPositions[accentIndex * 3 + 1] =
                            nodePositions[baseIndex * 3 + 1]!;

                        accentPositions[accentIndex * 3 + 2] =
                            nodePositions[baseIndex * 3 + 2]!;
                    });

                    accentGeometry.attributes.position.needsUpdate = true;

                    linePairs.forEach(([a, b], lineIndex) => {
                        const offset = lineIndex * 6;

                        linePositions[offset] = nodePositions[a * 3]!;
                        linePositions[offset + 1] =
                            nodePositions[a * 3 + 1]!;
                        linePositions[offset + 2] =
                            nodePositions[a * 3 + 2]!;

                        linePositions[offset + 3] = nodePositions[b * 3]!;
                        linePositions[offset + 4] =
                            nodePositions[b * 3 + 1]!;
                        linePositions[offset + 5] =
                            nodePositions[b * 3 + 2]!;
                    });

                    lineGeometry.attributes.position.needsUpdate = true;
                };

                // --------------------------------------------------
                // RENDERING
                // --------------------------------------------------

                const render = (time: number) => {
                    writePositions(time);

                    camera.position.x +=
                        (pointer.x * 1.2 - camera.position.x) * 0.04;

                    camera.position.y +=
                        (-pointer.y * 0.8 - camera.position.y) * 0.04;

                    camera.lookAt(0, 0, 0);

                    renderer.render(scene, camera);
                };

                let animationFrame = 0;

                const animate = (time: number) => {
                    if (disposed || !shouldAnimate) return;

                    render(time);

                    animationFrame = requestAnimationFrame(animate);
                };

                if (shouldAnimate) {
                    animationFrame = requestAnimationFrame(animate);
                } else {
                    render(0);
                }

                // --------------------------------------------------
                // CLEANUP
                // --------------------------------------------------

                cleanup = () => {
                    cancelAnimationFrame(animationFrame);

                    resizeObserver.disconnect();
                    themeObserver.disconnect();

                    reducedMotion.removeEventListener(
                        "change",
                        onMotionPreferenceChange,
                    );

                    window.removeEventListener(
                        "pointermove",
                        onPointerMove,
                    );

                    nodeGeometry.dispose();
                    accentGeometry.dispose();
                    lineGeometry.dispose();

                    nodeMaterial.dispose();
                    accentMaterial.dispose();
                    lineMaterial.dispose();

                    renderer.dispose();
                    renderer.domElement.remove();
                };
            } catch {
                // Three.js failed to initialize. The page remains usable.
            }
        }

        void initializeScene();

        return () => {
            disposed = true;
            cleanup?.();
        };
    }, []);

    return (
        <div
            ref={host}
            aria-hidden="true"
            className={className}
        />
    );
}