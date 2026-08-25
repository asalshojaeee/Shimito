import React, { useId } from "react";

type LineProps = {
  /** divider color */
  color?: string;              // default '#D9D9D9'
  /** overall SVG height in px (the glow needs some room) */
  height?: number;             // default 70
  /** inner horizontal padding (space before/after the line) */
  pad?: number;                // default 33 (like your SVG)
  /** glow strength */
  blur?: number;               // default 16
  /** glow color */
  glowColor?: string;          // default '#ffffff'
  /** extra classes (margin, width, etc.) */
  className?: string;
};

const Line: React.FC<LineProps> = ({
  color = "#D9D9D9",
  height = 70,
  pad = 33,
  blur = 16,
  glowColor = "#ffffff",
  className,
}) => {
  const filterId = useId();

  // We keep the original viewBox (776x70) so it scales nicely to any width.
  // The path is the same rounded “bar” centered vertically with padding on both sides.
  return (
    <svg
      className={className}
      width="100%"
      height={height}
      viewBox="0 0 776 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g filter={`url(#glow-${filterId})`}>
        {/* horizontal rounded bar (using a rounded rect path like your original) */}
        <path
          d={`M${pad} 35a2 2 0 0 1 2-2h${776 - pad * 2 - 4}
              a2 2 0 0 1 0 4H${pad + 2}a2 2 0 0 1-2-2z`}
          fill={color}
        />
      </g>
      <defs>
        {/* soft glow/drop shadow */}
        <filter
          id={`glow-${filterId}`}
          x="0"
          y="0"
          width="776"
          height="70"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          {/* expand source a bit (similar to morphology+dilate) */}
          <feGaussianBlur in="SourceAlpha" stdDeviation={blur} result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0"
            result="whiten"
          />
          <feFlood floodColor={glowColor} floodOpacity="1" result="flood" />
          <feComposite in="flood" in2="whiten" operator="in" result="glow" />
          <feBlend in="SourceGraphic" in2="glow" mode="normal" />
        </filter>
      </defs>
    </svg>
  );
};

export default Line;
