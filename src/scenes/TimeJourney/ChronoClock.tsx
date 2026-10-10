import React, { useRef, useEffect, useState, useCallback } from 'react';

interface ChronoClockProps {
  years: string[];
  activeYear: string;
  onSelectYear: (year: string) => void;
}

// Calculate shortest angular path so needle never spins 300° backwards
const getShortestRotation = (curr: number, targetBase: number) => {
  const norm = ((curr % 360) + 360) % 360;
  let diff = targetBase - norm;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return curr + diff;
};

export const ChronoClock: React.FC<ChronoClockProps> = ({
  years,
  activeYear,
  onSelectYear,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const anglePerItem = 360 / years.length;

  const [rotation, setRotation] = useState<number>(() => {
    const idx = years.indexOf(activeYear);
    return idx >= 0 ? idx * anglePerItem : 0;
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Sync rotation when activeYear changes externally (and not dragging)
  useEffect(() => {
    if (isDragging) return;
    const targetIdx = years.indexOf(activeYear);
    if (targetIdx !== -1) {
      const targetBase = targetIdx * anglePerItem;
      setRotation((prev) => getShortestRotation(prev, targetBase));
    }
  }, [activeYear, isDragging, anglePerItem, years]);

  const selectByIndex = useCallback(
    (index: number) => {
      const targetBase = index * anglePerItem;
      setRotation((prev) => getShortestRotation(prev, targetBase));
      const targetYear = years[index];
      if (targetYear && targetYear !== activeYear) {
        onSelectYear(targetYear);
      }
    },
    [anglePerItem, years, activeYear, onSelectYear]
  );

  const updateAngleFromPoint = (clientX: number, clientY: number, isFinal: boolean) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = clientX - cx;
    const dy = clientY - cy;

    // Angle where 0° points straight UP (-Y direction)
    let theta = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    theta = ((theta % 360) + 360) % 360;

    const closestIdx = Math.round(theta / anglePerItem) % years.length;
    const closestYear = years[closestIdx];

    if (isFinal) {
      // Snap to target node angle smoothly on release
      const targetBase = closestIdx * anglePerItem;
      setRotation((prev) => getShortestRotation(prev, targetBase));
      if (closestYear !== activeYear) {
        onSelectYear(closestYear);
      }
    } else {
      // 1:1 real-time smooth rotation during drag (zero latency)
      setRotation((prev) => {
        const norm = ((prev % 360) + 360) % 360;
        let delta = theta - norm;
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;
        return prev + delta;
      });
      if (closestYear !== activeYear) {
        onSelectYear(closestYear);
      }
    }
  };

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (e.button !== 0) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // fallback if pointer capture unsupported
    }
    setIsDragging(true);
    updateAngleFromPoint(e.clientX, e.clientY, false);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    updateAngleFromPoint(e.clientX, e.clientY, false);
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    setIsDragging(false);
    updateAngleFromPoint(e.clientX, e.clientY, true);
  };

  // Desktop mouse wheel support: scroll to advance or reverse era
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) < 12) return;
    e.preventDefault();
    const dir = e.deltaY > 0 ? 1 : -1;
    const currentIdx = Math.max(0, years.indexOf(activeYear));
    const nextIdx = (currentIdx + dir + years.length) % years.length;
    selectByIndex(nextIdx);
  };

  // Keyboard navigation for desktop accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    let dir = 0;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') dir = 1;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') dir = -1;
    if (dir !== 0) {
      e.preventDefault();
      const currentIdx = Math.max(0, years.indexOf(activeYear));
      const nextIdx = (currentIdx + dir + years.length) % years.length;
      selectByIndex(nextIdx);
    }
  };

  return (
    <div
      className="chrono-dial-wrap focus:outline-none"
      tabIndex={0}
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Temporal Chrono Dial"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        className="chrono-dial-svg select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <defs>
          <radialGradient id="dialGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e50914" stopOpacity="0.18" />
            <stop offset="65%" stopColor="#e50914" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <filter id="needleGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#e50914" floodOpacity="0.75" />
          </filter>
        </defs>

        {/* Outer Background Glow */}
        <circle cx="200" cy="200" r="180" fill="url(#dialGlow)" />

        {/* Tactical Outer Reference Rings */}
        <circle
          cx="200"
          cy="200"
          r="170"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
        <circle
          cx="200"
          cy="200"
          r="140"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
        <circle
          cx="200"
          cy="200"
          r="105"
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
          strokeDasharray="2 8"
        />

        {/* Rotating Needle (Smooth desktop GPU rotation) */}
        <g
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: '200px 200px',
            transition: isDragging ? 'none' : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform',
          }}
        >
          {/* Laser needle shaft: starts at center hub perimeter (y=168) and stops at arrowhead base (y=88) */}
          <line
            x1="200"
            y1="168"
            x2="200"
            y2="88"
            stroke="#e50914"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#needleGlow)"
          />

          {/* Hub anchor joint dot */}
          <circle cx="200" cy="168" r="2" fill="#ffffff" />

          {/* Sleek tactical arrowhead: points to year node (y=60, r=16) and stops cleanly at y=80 with a 4px gap */}
          <polygon
            points="200,80 206,92 200,88 194,92"
            fill="#ffffff"
            stroke="#e50914"
            strokeWidth="1.2"
            filter="url(#needleGlow)"
          />
        </g>

        {/* Central Hub Display (Overlaying needle base) */}
        <g className="pointer-events-none select-none">
          <circle
            cx="200"
            cy="200"
            r="32"
            fill="#080808"
            stroke="#e50914"
            strokeWidth="2"
            filter="url(#needleGlow)"
          />
          <circle
            cx="200"
            cy="200"
            r="26"
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1"
            strokeDasharray="2 3"
          />
          <text
            x="200"
            y="199"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#ffffff"
            fontSize="12"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="bold"
            letterSpacing="0.05em"
          >
            {activeYear}
          </text>
          <text
            x="200"
            y="212"
            textAnchor="middle"
            fill="rgba(255,255,255,0.4)"
            fontSize="6"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="600"
            letterSpacing="0.2em"
          >
            ERA
          </text>
        </g>

        {/* Year Nodes on Perimeter (r = 140) */}
        {years.map((year, i) => {
          const angle = (i * anglePerItem - 90) * (Math.PI / 180);
          const r = 140;
          const x = 200 + r * Math.cos(angle);
          const y = 200 + r * Math.sin(angle);
          const isSelected = year === activeYear;

          return (
            <g
              key={year}
              onClick={(e) => {
                e.stopPropagation();
                selectByIndex(i);
              }}
              className="cursor-pointer group"
            >
              {/* Invisible extended touch/click hit area */}
              <circle cx={x} cy={y} r="24" fill="transparent" />

              {/* Active Radar Lock Ring */}
              {isSelected && (
                <circle
                  cx={x}
                  cy={y}
                  r="22"
                  fill="none"
                  stroke="#e50914"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                  className="animate-spin"
                  style={{ animationDuration: '8s' }}
                />
              )}

              {/* Node Badge */}
              <circle
                cx={x}
                cy={y}
                r={isSelected ? 16 : 9}
                fill={isSelected ? '#e50914' : '#101010'}
                stroke={isSelected ? '#ffffff' : 'rgba(255,255,255,0.22)'}
                strokeWidth={isSelected ? 2 : 1}
                className="transition-all duration-300 group-hover:stroke-white/60"
              />

              {/* Year Label */}
              <text
                x={x}
                y={y + (isSelected ? 4 : 3.5)}
                textAnchor="middle"
                fill={isSelected ? '#ffffff' : 'rgba(255,255,255,0.7)'}
                fontSize={isSelected ? '11' : '8.5'}
                fontFamily="JetBrains Mono, monospace"
                fontWeight={isSelected ? 'bold' : 'normal'}
                className="select-none pointer-events-none transition-all duration-300"
              >
                {year}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
