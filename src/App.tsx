import React, { useState, useEffect } from 'react';
import { SmoothScroll } from './components/SmoothScroll';
import { WebGLCanvas } from './gl/WebGLCanvas';
import { CinematicHUD } from './components/CinematicHUD';
import { CustomCursor } from './components/CustomCursor';
import { HeroScene } from './scenes/Hero/HeroScene';
import { EducationScene } from './scenes/Education/EducationScene';
import { CreativeUniverseScene } from './scenes/CreativeUniverse/CreativeUniverseScene';
import { TimeJourneyScene } from './scenes/TimeJourney/TimeJourneyScene';
import { CertificatesScene } from './scenes/Certificates/CertificatesScene';
import { ProjectUniverseScene } from './scenes/ProjectUniverse/ProjectUniverseScene';
import { FinaleScene } from './scenes/Finale/FinaleScene';
import { FloatingMusicWidget } from './components/FloatingMusicWidget';
import './styles/index.css';
import './styles/cinematic.css';

export const App: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<number>(1);

  // Active scene scroll tracker
  useEffect(() => {
    const sceneIds = ['hero', 'education', 'universe', 'chrono', 'certificates', 'projects', 'finale'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = sceneIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sceneIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setCurrentScene(i + 1);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigateScene = (sceneIndex: number) => {
    const sceneIds = ['hero', 'education', 'universe', 'chrono', 'certificates', 'projects', 'finale'];
    const targetId = sceneIds[sceneIndex - 1];
    if (targetId) {
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleReset = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentScene(1);
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
        {/* Unified 3D WebGL Particle & Atmosphere Canvas */}
        <WebGLCanvas currentScene={currentScene} />

        {/* Custom Target Cursor */}
        <CustomCursor />

        {/* Film Noir Camera HUD */}
        <CinematicHUD
          currentScene={currentScene}
          onNavigateScene={handleNavigateScene}
        />

        {/* Anamorphic Scope Letterbox Overlay */}
        <div className="cinema-scope-overlay">
          <div className="cinema-scope-bar top" />
          <div className="cinema-scope-bar bottom" />
        </div>

        {/* Film Post-Processing Layers */}
        <div className="film-grain" />
        <div className="cinema-vignette" />
        <div className="cinema-scanlines" />

        {/* Floating Soundtrack Widget (Reference Match) */}
        <FloatingMusicWidget src="/the-kill-2.mp3" />

        {/* 7 Cinematic Film Scenes */}
        <main className="relative z-10">
          <HeroScene />
          <EducationScene />
          <CreativeUniverseScene />
          <TimeJourneyScene />
          <CertificatesScene />
          <ProjectUniverseScene />
          <FinaleScene onResetScene={handleReset} />
        </main>
      </div>
    </SmoothScroll>
  );
};

export default App;
