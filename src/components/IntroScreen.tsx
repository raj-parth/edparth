import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

interface IntroScreenProps {
  onEnter: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onEnter }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // 1. Three.js 3D WebGL Scene with Professional Blue Theme
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for all rotating elements
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Core Icosahedron Wireframe in Professional Royal Blue
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x2563eb, // Royal Blue
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // 2. Glowing Vertices Points
    const corePointsMat = new THREE.PointsMaterial({
      color: 0x60a5fa, // Light Sky Blue
      size: 0.08,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const corePoints = new THREE.Points(coreGeo, corePointsMat);
    mainGroup.add(corePoints);

    // 3. Inner Solid Nucleus with Smooth Shading
    const innerGeo = new THREE.OctahedronGeometry(0.8, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      emissive: 0x1e3a8a,
      roughness: 0.25,
      metalness: 0.75,
      wireframe: false
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // 4. Orbital Rings in Cohesive Shades of Blue
    const createRing = (radius: number, color: number, tiltX: number, tiltY: number) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.012, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.45
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = tiltX;
      ringMesh.rotation.y = tiltY;
      return ringMesh;
    };

    const ring1 = createRing(2.3, 0x3b82f6, Math.PI / 3, Math.PI / 6);
    const ring2 = createRing(2.7, 0x2563eb, -Math.PI / 4, Math.PI / 3);
    const ring3 = createRing(3.1, 0x1d4ed8, Math.PI / 2.2, -Math.PI / 5);
    mainGroup.add(ring1);
    mainGroup.add(ring2);
    mainGroup.add(ring3);

    // 5. Starfield / Ambient Particle Cloud in Soft Blue
    const particlesCount = 850;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 16;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // 6. Deep Blue Volumetric Point Lights
    const pointLight1 = new THREE.PointLight(0x2563eb, 16, 50);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x1d4ed8, 14, 50);
    pointLight2.position.set(-5, -5, 3);
    scene.add(pointLight2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.0008;
      mouseY = (event.clientY - windowHalfY) * 0.0008;

      if (isDragging) {
        const deltaX = event.clientX - prevMouseX;
        const deltaY = event.clientY - prevMouseY;
        mainGroup.rotation.y += deltaX * 0.008;
        mainGroup.rotation.x += deltaY * 0.008;
        prevMouseX = event.clientX;
        prevMouseY = event.clientY;
      }
    };

    const handleMouseDown = (event: MouseEvent) => {
      isDragging = true;
      prevMouseX = event.clientX;
      prevMouseY = event.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth continuous rotation
      if (!isDragging) {
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        mainGroup.rotation.y += 0.004;
        mainGroup.rotation.x += 0.002;

        camera.position.x += (targetX * 3 - camera.position.x) * 0.05;
        camera.position.y += (-targetY * 3 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
      }

      // Orbital Rings Rotation
      ring1.rotation.z = elapsedTime * 0.22;
      ring2.rotation.z = -elapsedTime * 0.28;
      ring3.rotation.z = elapsedTime * 0.16;

      // Inner Nucleus Rotation & Subtle Pulse
      innerMesh.rotation.y = -elapsedTime * 0.5;
      innerMesh.rotation.x = elapsedTime * 0.35;
      const scale = 1 + Math.sin(elapsedTime * 2) * 0.05;
      innerMesh.scale.set(scale, scale, scale);

      // Ambient drift
      particlesMesh.rotation.y = elapsedTime * 0.015;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  const handleGetStarted = () => {
    onEnter();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060b14] text-slate-100 flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden font-sans">
      
      {/* 3D WebGL Background Scene */}
      <div 
        ref={mountRef} 
        className="fixed inset-0 z-0 cursor-grab active:cursor-grabbing"
      />

      {/* Subtle Blue Radial Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] sm:w-[750px] sm:h-[750px] rounded-full bg-blue-600/10 blur-[140px]" />
      </div>

      {/* TOP HEADER: Clean & Professional */}
      <header className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between">
        <div className="bg-slate-900/80 backdrop-blur-xl px-4 py-2 rounded-2xl border border-slate-800 shadow-sm">
          <Logo theme="dark" size="sm" showSubtitle={true} />
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-400 font-medium backdrop-blur-md">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
          <span>JEE • NEET • Boards</span>
        </div>
      </header>

      {/* CENTER STAGE: Minimal Text & Name Animation */}
      <main className="relative z-10 max-w-xl w-full mx-auto text-center flex flex-col items-center justify-center my-auto space-y-6 pointer-events-none">
        
        {/* Minimal Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/60 border border-blue-600/30 text-blue-300 text-xs font-medium tracking-wide shadow-sm backdrop-blur-md"
        >
          <span>India's Premier Learning Companion</span>
        </motion.div>

        {/* Brand Name Headline */}
        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none"
          >
            <span>Ed</span>
            <span className="text-blue-500">Parth</span>
          </motion.h1>

          <p className="text-xs sm:text-sm text-slate-300 font-normal max-w-md mx-auto leading-relaxed">
            Authentic NTA CBT Mock Engine, 24/7 AI Doubts & High-Yield Lectures for JEE & NEET.
          </p>
        </div>

        {/* Single Professional Blue CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="pointer-events-auto pt-1"
        >
          <button
            onClick={handleGetStarted}
            className="px-8 py-3.5 sm:py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide shadow-[0_4px_25px_rgba(37,99,235,0.4)] hover:shadow-[0_6px_35px_rgba(37,99,235,0.6)] transition-all flex items-center gap-2.5 cursor-pointer group hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Drag Hint */}
        <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5 pointer-events-auto pt-2">
          <Compass className="w-3.5 h-3.5 text-blue-400" />
          <span>Drag to rotate 3D view</span>
        </div>

      </main>

      {/* CLEAN MINIMAL FOOTER */}
      <footer className="relative z-10 w-full max-w-4xl mx-auto text-center">
        <p className="text-[11px] text-slate-500 font-medium">
          EdParth Study Portal • 256-Bit SSL Encrypted • Built for Serious Aspirants
        </p>
      </footer>

    </div>
  );
};
