import React, { useRef, useEffect, useState } from 'react';

interface ChronoClockProps {
  years: string[];
  activeYear: string;
  onSelectYear: (year: string) => void;
}

export const ChronoClock: React.FC<ChronoClockProps> = ({
  years,
  activeYear,
  onSelectYear,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const activeIndex = years.indexOf(activeYear);
  const anglePerItem = 360 / years.length;

  useEffect(() => {
    if (activeIndex !== -1) {
      setRotation(activeIndex * anglePerItem);
    }
  }, [activeIndex, anglePerItem]);

  const calculateAngleFromPoint = (clientX: number, clientY: number) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    let theta = Math.atan2(dy, dx) * (180 / Math.PI);
    theta = (theta + 90 + 360) % 360;

    // Snap to closest year
    const index = Math.round(theta / anglePerItem) % years.length;
    onSelectYear(years[index]);
    setRotation(index * anglePerItem);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    calculateAngleFromPoint(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    calculateAngleFromPoint(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="chrono-dial-wrap"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        className="chrono-dial-svg select-none"
        onPointerDown={handlePointerDown}
      >
        <defs>
          <radialGradient id="dialGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e50914" stopOpacity="0.15" />
            <stop offset="70%" stopColor="#e50914" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Background Glow */}
        <circle cx="200" cy="200" r="180" fill="url(#dialGlow)" />

        {/* Outer Ring */}
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
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />

        {/* Year Nodes on Perimeter */}
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
                onSelectYear(year);
              }}
              className="cursor-pointer"
            >
              {/* Year Marker Ring */}
              <circle
                cx={x}
                cy={y}
                r={isSelected ? 16 : 8}
                fill={isSelected ? '#e50914' : '#141414'}
                stroke={isSelected ? '#ffffff' : 'rgba(255,255,255,0.2)'}
                strokeWidth={isSelected ? 2 : 1}
                className="transition-all duration-300"
              />
              {/* Year Label */}
              <text
                x={x}
                y={y + (isSelected ? 5 : 4)}
                textAnchor="middle"
                fill={isSelected ? '#ffffff' : '#888888'}
                fontSize={isSelected ? '12' : '10'}
                fontFamily="JetBrains Mono, monospace"
                fontWeight={isSelected ? 'bold' : 'normal'}
                className="select-none pointer-events-none transition-all duration-300"
              >
                {year}
              </text>
            </g>
          );
        })}

        {/* Central Hub */}
        <circle cx="200" cy="200" r="32" fill="#0c0c0c" stroke="#e50914" strokeWidth="2" />
        <circle cx="200" cy="200" r="8" fill="#e50914" />

        {/* Center Active Year Display */}
        <text
          x="200"
          y="204"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="10"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="bold"
        >
          {activeYear}
        </text>

        {/* Rotating Clock Needle */}
        <g transform={`rotate(${rotation} 200 200)`} className="transition-transform duration-500 ease-out">
          <line
            x1="200"
            y1="200"
            x2="200"
            y2="70"
            stroke="#e50914"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <polygon points="196,70 204,70 200,56" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
};
