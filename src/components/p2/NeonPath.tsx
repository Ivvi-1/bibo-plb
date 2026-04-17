"use client";

interface NeonPathProps {
  d: string;
  duration?: number;
  delay?: number;
  dotRadius?: number;
  className?: string;
  showDot?: boolean;
  showBase?: boolean;
}

export default function NeonPath({
  d,
  duration = 5,
  delay = 0,
  dotRadius = 3,
  className = "",
  showDot = true,
  showBase = true,
}: NeonPathProps) {
  const pathId = `np-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <g className={className}>
      {showBase && <path d={d} className="p2-base-line" />}
      <path id={pathId} d={d} className="p2-tracer-line" style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }} />
      {showDot && (
        <circle r={dotRadius} fill="#4f7fff" className="p2-neon-glow">
          <animateMotion dur={`${duration}s`} repeatCount="indefinite" begin={`${delay}s`}>
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </circle>
      )}
    </g>
  );
}
