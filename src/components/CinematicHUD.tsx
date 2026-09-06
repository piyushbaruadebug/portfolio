import React, { useEffect, useState } from 'react';

interface CinematicHUDProps {
  currentScene: number;
  onNavigateScene: (sceneIndex: number) => void;
}

const SCENE_NAMES = [
  'SCENE 01 // ABOUT',
  'SCENE 02 // ACADEMIC FOUNDATIONS',
  'SCENE 03 // CREATIVE UNIVERSE',
  'SCENE 04 // JOURNEY THROUGH TIME',
  'SCENE 05 // CERTIFICATIONS',
  'SCENE 06 // PROJECT SHOWCASE',
  'SCENE 07 // CINEMATIC FINALE',
];

export const CinematicHUD: React.FC<CinematicHUDProps> = ({
  currentScene,
  onNavigateScene,
}) => {
  const [timecode, setTimecode] = useState('00:00:00:00');

  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const frames = String(frame % 24).padStart(2, '0');
      const totalSeconds = Math.floor(frame / 24);
      const seconds = String(totalSeconds % 60).padStart(2, '0');
      const minutes = String(Math.floor(totalSeconds / 60) % 60).padStart(2, '0');
      const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
      setTimecode(`${hours}:${minutes}:${seconds}:${frames}`);
    }, 1000 / 24);

  return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Top HUD Row */}
      <header className="cinema-hud-top">
        <div className="flex items-center gap-4">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              onNavigateScene(1);
            }}
            className="hud-logo interactive"
          >
            <div className="hud-logo-icon">
              <span className="font-cinema text-red-500 text-sm">PB</span>
            </div>
            <span className="font-editorial text-xs md:text-sm tracking-[0.25em] text-white">
              PIYUSH BARUA
            </span>
          </a>

          <div className="hidden sm:flex hud-pill">
            <span className="hud-rec-dot" />
            <span className="text-neutral-400">REC</span>
            <span className="text-white font-semibold">{timecode}</span>
          </div>
        </div>

        {/* Minimal Scene Navigation */}
        <nav className="hud-nav" aria-label="Cinematic Scenes">
          {[
            { id: 1, label: '01 ABOUT' },
            { id: 2, label: '02 EDU' },
            { id: 3, label: '03 TOOLS' },
            { id: 4, label: '04 CHRONO' },
            { id: 5, label: '05 CERTS' },
            { id: 6, label: '06 WORKS' },
            { id: 7, label: '07 FINALE' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigateScene(item.id)}
              className={`interactive hud-nav-btn ${
                currentScene === item.id ? 'active' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hud-pill hidden md:flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-wider text-neutral-300">4K // CINEMA SCOPE</span>
          </div>
        </div>
      </header>

      {/* Bottom HUD Row */}
      <footer className="cinema-hud-bottom !justify-end">
        <div className="hud-pill">
          <span className="text-neutral-300 text-[11px] font-mono">
            {SCENE_NAMES[currentScene - 1] || 'SCENE // ACTIVE'}
          </span>
        </div>
      </footer>
    </>
  );
};
