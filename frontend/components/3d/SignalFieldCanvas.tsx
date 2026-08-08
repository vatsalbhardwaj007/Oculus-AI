"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useAgentStore } from '../../lib/state/useAgentStore';

export const SignalFieldCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isReducedMotion } = useAgentStore();
  const [hasWebGLError, setHasWebGLError] = useState(false);

  useEffect(() => {
    if (isReducedMotion || !containerRef.current) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number;

    try {
      const container = containerRef.current;
      const width = container.clientWidth || window.innerWidth || 1200;
      const height = container.clientHeight || window.innerHeight || 800;

      if (width === 0 || height === 0) return;

      // 1. Scene & Camera Setup - Near Black Obsidian Space
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x030508, 0.02);

      const aspect = height > 0 ? width / height : 1.6;
      const camera = new THREE.PerspectiveCamera(55, aspect, 0.1, 1000);
      camera.position.set(0, 6, 30);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // 2. Perspective Wireframe Grid Floor (Matching Benchmark Screenshot)
      const gridHelper = new THREE.GridHelper(120, 50, 0x00f2ff, 0x001d26);
      gridHelper.position.y = -10;
      gridHelper.material.opacity = 0.35;
      gridHelper.material.transparent = true;
      scene.add(gridHelper);

      // 3. Sparse Cyan Floating Dot Particles
      const particleCount = 120;
      const particlesGeo = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] = (Math.random() - 0.5) * 45;
        particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20 - 2;
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 35;
      }

      particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      const particlesMat = new THREE.PointsMaterial({
        color: 0x00f2ff,
        size: 0.18,
        transparent: true,
        opacity: 0.65,
      });
      const particleSystem = new THREE.Points(particlesGeo, particlesMat);
      scene.add(particleSystem);

      // 4. Subtle Network Connection Lines
      const lineCount = 8;
      const linePositions = new Float32Array(lineCount * 6);
      for (let i = 0; i < lineCount; i++) {
        const p1Idx = Math.floor(Math.random() * particleCount);
        const p2Idx = Math.floor(Math.random() * particleCount);

        linePositions[i * 6] = particlePositions[p1Idx * 3];
        linePositions[i * 6 + 1] = particlePositions[p1Idx * 3 + 1];
        linePositions[i * 6 + 2] = particlePositions[p1Idx * 3 + 2];

        linePositions[i * 6 + 3] = particlePositions[p2Idx * 3];
        linePositions[i * 6 + 4] = particlePositions[p2Idx * 3 + 1];
        linePositions[i * 6 + 5] = particlePositions[p2Idx * 3 + 2];
      }

      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      const lineMat = new THREE.LineBasicMaterial({ color: 0x00f2ff, opacity: 0.15, transparent: true });
      const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
      scene.add(linesMesh);

      // Mouse Parallax Effect
      let mouseX = 0;
      let mouseY = 0;

      const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / width - 0.5) * 2;
        mouseY = (event.clientY / height - 0.5) * 2;
      };
      window.addEventListener('mousemove', handleMouseMove);

      // Resize Handler
      const handleResize = () => {
        if (!containerRef.current || !renderer) return;
        const w = containerRef.current.clientWidth || window.innerWidth;
        const h = containerRef.current.clientHeight || window.innerHeight;
        if (h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      };
      window.addEventListener('resize', handleResize);

      // Animation Loop - Slow Quiet Movement
      const clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Slow particle drift
        particleSystem.rotation.y = elapsedTime * 0.03;
        gridHelper.rotation.y = Math.sin(elapsedTime * 0.01) * 0.02;

        // Smooth subtle camera drift
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
        camera.position.y += (-mouseY * 1.5 + 6 - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);

        if (renderer) {
          renderer.render(scene, camera);
        }
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        if (renderer && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
        }
      };
    } catch (err) {
      console.warn("WebGL canvas warning, using subtle CSS grid fallback:", err);
      setHasWebGLError(true);
    }
  }, [isReducedMotion]);

  if (isReducedMotion || hasWebGLError) {
    return (
      <div className="fixed inset-0 cyber-grid-bg opacity-20 pointer-events-none z-0" />
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
};
