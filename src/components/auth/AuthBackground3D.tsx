import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const AuthBackground3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Root group that responds gently to mouse parallax
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // ==========================================
    // 2. MATHEMATICAL 3D SINE WAVE PARTICLE MATRIX
    // ==========================================
    const gridX = 45;
    const gridZ = 35;
    const numParticles = gridX * gridZ;
    const wavePositions = new Float32Array(numParticles * 3);
    const waveColors = new Float32Array(numParticles * 3);

    const colorA = new THREE.Color(0x1e40af); // Deep Royal Blue
    const colorB = new THREE.Color(0x06b6d4); // Bright Cyan
    const colorC = new THREE.Color(0x8b5cf6); // Purple/Violet

    let idx = 0;
    const spacing = 0.45;
    const startX = -((gridX - 1) * spacing) / 2;
    const startZ = -((gridZ - 1) * spacing) / 2;

    for (let i = 0; i < gridX; i++) {
      for (let j = 0; j < gridZ; j++) {
        const px = startX + i * spacing;
        const pz = startZ + j * spacing;
        wavePositions[idx * 3] = px;
        wavePositions[idx * 3 + 1] = -2.8; // Lower horizon
        wavePositions[idx * 3 + 2] = pz;

        // Radial color mix
        const distRatio = Math.min(1, Math.sqrt(px * px + pz * pz) / 10);
        const mixedColor = distRatio < 0.5 
          ? colorA.clone().lerp(colorB, distRatio * 2)
          : colorB.clone().lerp(colorC, (distRatio - 0.5) * 2);

        waveColors[idx * 3] = mixedColor.r;
        waveColors[idx * 3 + 1] = mixedColor.g;
        waveColors[idx * 3 + 2] = mixedColor.b;
        idx++;
      }
    }

    const waveGeometry = new THREE.BufferGeometry();
    waveGeometry.setAttribute('position', new THREE.BufferAttribute(wavePositions, 3));
    waveGeometry.setAttribute('color', new THREE.BufferAttribute(waveColors, 3));

    const waveMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending
    });

    const waveMesh = new THREE.Points(waveGeometry, waveMaterial);
    worldGroup.add(waveMesh);

    // ==========================================
    // 3. FLOATING 3D TORUS KNOT (Fully Framed & Centered in View)
    // ==========================================
    const torusKnotGeo = new THREE.TorusKnotGeometry(1.25, 0.3, 100, 18, 2, 3);
    const torusKnotMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, // Vibrant Electric Sky Blue
      wireframe: true,
      transparent: true,
      opacity: 0.65
    });
    const torusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat);
    torusKnot.position.set(3.6, 0.8, -1.8);
    worldGroup.add(torusKnot);

    // Torus points for glowing white/cyan vertices
    const torusPointsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const torusPoints = new THREE.Points(torusKnotGeo, torusPointsMat);
    torusKnot.add(torusPoints);

    // Glowing Point Light inside Torus Knot
    const torusLight = new THREE.PointLight(0x38bdf8, 6, 10);
    torusKnot.add(torusLight);

    // ==========================================
    // 4. FLOATING STEM POLYHEDRA (Left & Center Depth)
    // ==========================================
    // A. Dodecahedron (Deep Knowledge Symbol)
    const dodecaGeo = new THREE.DodecahedronGeometry(1.2, 0);
    const dodecaMat = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
      roughness: 0.3,
      metalness: 0.8
    });
    const dodecaMesh = new THREE.Mesh(dodecaGeo, dodecaMat);
    dodecaMesh.position.set(-5.5, -0.4, -2.5);
    worldGroup.add(dodecaMesh);

    // Inner Glowing Core inside Dodecahedron
    const dodecaCoreGeo = new THREE.OctahedronGeometry(0.5, 0);
    const dodecaCoreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: false,
      transparent: true,
      opacity: 0.4
    });
    const dodecaCore = new THREE.Mesh(dodecaCoreGeo, dodecaCoreMat);
    dodecaMesh.add(dodecaCore);

    // B. Floating Octahedron (Physics Diamond)
    const octaGeo = new THREE.OctahedronGeometry(0.85, 0);
    const octaMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const octaMesh = new THREE.Mesh(octaGeo, octaMat);
    octaMesh.position.set(-3.2, 2.6, -4.5);
    worldGroup.add(octaMesh);

    // C. Floating Icosahedron Satellite (Bottom Center)
    const icoGeo = new THREE.IcosahedronGeometry(0.7, 0);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(2.8, -1.8, -2.0);
    worldGroup.add(icoMesh);

    // ==========================================
    // 5. DOUBLE-HELIX DNA SPIRAL (Science / Biology)
    // ==========================================
    const helixPointsCount = 140;
    const helixPositions = new Float32Array(helixPointsCount * 3);
    const helixColors = new Float32Array(helixPointsCount * 3);
    const helixColor1 = new THREE.Color(0x38bdf8);
    const helixColor2 = new THREE.Color(0xf59e0b);

    for (let i = 0; i < helixPointsCount; i++) {
      const angle = (i / 14) * Math.PI;
      const strand = i % 2 === 0 ? 1 : -1;
      const radius = 0.6;
      const hx = Math.cos(angle) * radius * strand;
      const hy = (i - helixPointsCount / 2) * 0.06;
      const hz = Math.sin(angle) * radius * strand;

      helixPositions[i * 3] = hx;
      helixPositions[i * 3 + 1] = hy;
      helixPositions[i * 3 + 2] = hz;

      const chosenColor = strand === 1 ? helixColor1 : helixColor2;
      helixColors[i * 3] = chosenColor.r;
      helixColors[i * 3 + 1] = chosenColor.g;
      helixColors[i * 3 + 2] = chosenColor.b;
    }

    const helixGeo = new THREE.BufferGeometry();
    helixGeo.setAttribute('position', new THREE.BufferAttribute(helixPositions, 3));
    helixGeo.setAttribute('color', new THREE.BufferAttribute(helixColors, 3));

    const helixMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });
    const helixMesh = new THREE.Points(helixGeo, helixMat);
    helixMesh.position.set(-6.2, 0.8, -4);
    worldGroup.add(helixMesh);

    // ==========================================
    // 6. DEEP COSMIC PARTICLES (Background Field)
    // ==========================================
    const cosmicCount = 450;
    const cosmicPos = new Float32Array(cosmicCount * 3);
    for (let i = 0; i < cosmicCount * 3; i += 3) {
      cosmicPos[i] = (Math.random() - 0.5) * 28;
      cosmicPos[i + 1] = (Math.random() - 0.5) * 18;
      cosmicPos[i + 2] = -5 - Math.random() * 12;
    }
    const cosmicGeo = new THREE.BufferGeometry();
    cosmicGeo.setAttribute('position', new THREE.BufferAttribute(cosmicPos, 3));
    const cosmicMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const cosmicPoints = new THREE.Points(cosmicGeo, cosmicMat);
    scene.add(cosmicPoints);

    // ==========================================
    // 7. LIGHTING
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x2563eb, 8, 30);
    blueLight.position.set(4, 4, 3);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 6, 25);
    cyanLight.position.set(-5, -2, 2);
    scene.add(cyanLight);

    const mouseLight = new THREE.PointLight(0x818cf8, 4, 15);
    mouseLight.position.set(0, 0, 5);
    scene.add(mouseLight);

    // ==========================================
    // 8. INTERACTIVE MOUSE PARALLAX
    // ==========================================
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 1.5;

    const handleMouseMove = (event: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouseX = (event.clientX - halfW) / halfW;
      mouseY = (event.clientY - halfH) / halfH;

      targetCameraX = mouseX * 0.9;
      targetCameraY = 1.5 - mouseY * 0.6;

      mouseLight.position.x = mouseX * 6;
      mouseLight.position.y = -mouseY * 4;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // ==========================================
    // 9. RENDER LOOP
    // ==========================================
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation for cinematic feel
      camera.position.x += (targetCameraX - camera.position.x) * 0.035;
      camera.position.y += (targetCameraY - camera.position.y) * 0.035;
      camera.lookAt(0, 0, 0);

      // A. Animate Wave Vertices
      const posAttr = waveGeometry.attributes.position as THREE.BufferAttribute;
      const positions = posAttr.array as Float32Array;

      let pIdx = 0;
      for (let i = 0; i < gridX; i++) {
        for (let j = 0; j < gridZ; j++) {
          const px = positions[pIdx * 3];
          const pz = positions[pIdx * 3 + 2];
          // Harmonic wave equation
          const waveHeight = 
            Math.sin(px * 0.45 + elapsedTime * 1.2) * 0.35 +
            Math.cos(pz * 0.45 + elapsedTime * 0.9) * 0.35 +
            Math.sin((px + pz) * 0.3 + elapsedTime * 0.7) * 0.2;

          positions[pIdx * 3 + 1] = -2.8 + waveHeight;
          pIdx++;
        }
      }
      posAttr.needsUpdate = true;

      // B. Animate Torus Knot - smoothly floating and orbiting in comfortable view
      torusKnot.rotation.x = elapsedTime * 0.22;
      torusKnot.rotation.y = elapsedTime * 0.28;
      torusKnot.position.y = 0.8 + Math.sin(elapsedTime * 0.6) * 0.12;
      torusKnot.position.x = 3.6 + Math.cos(elapsedTime * 0.4) * 0.15;

      // C. Animate Dodecahedron & Core
      dodecaMesh.rotation.x = elapsedTime * 0.22;
      dodecaMesh.rotation.y = elapsedTime * 0.3;
      dodecaMesh.position.y = -0.4 + Math.sin(elapsedTime * 0.7 + 1) * 0.2;
      dodecaCore.rotation.x = -elapsedTime * 0.5;
      dodecaCore.rotation.z = elapsedTime * 0.4;

      // D. Animate Octahedron
      octaMesh.rotation.y = elapsedTime * 0.35;
      octaMesh.rotation.z = elapsedTime * 0.2;
      octaMesh.position.y = 2.6 + Math.cos(elapsedTime * 0.9) * 0.18;

      // E. Animate Icosahedron Satellite
      icoMesh.rotation.x = elapsedTime * 0.28;
      icoMesh.rotation.y = -elapsedTime * 0.22;
      icoMesh.position.y = -1.8 + Math.sin(elapsedTime * 1.1 + 2) * 0.15;

      // F. Animate Helix
      helixMesh.rotation.y = elapsedTime * 0.4;
      helixMesh.position.y = 0.8 + Math.sin(elapsedTime * 0.6) * 0.2;

      // G. Slow Cosmic Dust rotation
      cosmicPoints.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      waveGeometry.dispose();
      waveMaterial.dispose();
      torusKnotGeo.dispose();
      torusKnotMat.dispose();
      torusPointsMat.dispose();
      dodecaGeo.dispose();
      dodecaMat.dispose();
      dodecaCoreGeo.dispose();
      dodecaCoreMat.dispose();
      octaGeo.dispose();
      octaMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      helixGeo.dispose();
      helixMat.dispose();
      cosmicGeo.dispose();
      cosmicMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-100"
      style={{ filter: 'contrast(1.08)' }}
    />
  );
};
