import React, { useEffect, useRef, useState } from 'react';

interface FloatingMusicWidgetProps {
  src?: string;
}

export const FloatingMusicWidget: React.FC<FloatingMusicWidgetProps> = ({
  src = '/the-kill-2.mp3',
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.75);
  const manuallyPausedRef = useRef<boolean>(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    audio.preload = 'auto';
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Attempt autoplay immediately
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      // Browser blocked autoplay without user gesture
    });

    // Global first-interaction unlock
    const unlockAudio = () => {
      if (!manuallyPausedRef.current && audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    };

    const events = ['pointerdown', 'click', 'keydown', 'touchstart'];
    events.forEach((evt) => window.addEventListener(evt, unlockAudio, { passive: true }));

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, unlockAudio));
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      manuallyPausedRef.current = true;
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      manuallyPausedRef.current = false;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error('Audio play error:', err);
      });
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  return (
    <div
      className={`floating-music-widget ${isPlaying ? 'playing' : ''}`}
      role="region"
      aria-label="Audio Soundtrack Player"
    >
      <button
        type="button"
        onClick={togglePlay}
        className="music-widget-play-btn"
        aria-label={isPlaying ? 'Pause soundtrack' : 'Play soundtrack'}
        title="Play / Pause Audio"
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" width="1rem" height="1rem" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="1rem" height="1rem" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      <div className="music-widget-info">
        <div className="music-widget-title-row">
          <span className="music-widget-title" id="music-track-name">
            The Kill 2
          </span>
          <div className="music-widget-bars">
            <span className="m-bar" />
            <span className="m-bar" />
            <span className="m-bar" />
            <span className="m-bar" />
          </div>
        </div>
        <span className="music-widget-sub" id="music-artist-name">
          Lex Amarni, 2muchmotion
        </span>
      </div>

      <div className="music-widget-controls">
        <a
          href="https://youtu.be/fG3QMQ8G8hQ"
          target="_blank"
          rel="noopener noreferrer"
          className="music-next-btn"
          aria-label="Open on YouTube"
          title="Open on YouTube"
        >
          <svg viewBox="0 0 24 24" width="0.875rem" height="0.875rem" fill="currentColor">
            <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73z" />
          </svg>
        </a>
        <input
          type="range"
          className="music-vol-slider"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          title="Volume Control"
          aria-label="Volume"
        />
      </div>
    </div>
  );
};
