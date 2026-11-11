import type { CSSProperties, ElementType, ReactNode } from "react";

type TapeColor = "black" | "pink" | "green" | "lemon";

export function Tape({
  color = "black",
  rotate = 0,
  as: Tag = "span",
  className,
  children,
}: {
  color?: TapeColor;
  rotate?: number;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={["tape", color, className].filter(Boolean).join(" ")} style={{ transform: `rotate(${rotate}deg)` }}>
      {children}
    </Tag>
  );
}

export function Chip({
  color = "pink",
  rotate = -2,
  children,
}: {
  color?: "pink" | "green" | "black" | "lemon";
  rotate?: number;
  children: ReactNode;
}) {
  return (
    <span className={`chip ${color}`} style={{ transform: `rotate(${rotate}deg)` }}>
      {children}
    </span>
  );
}

export function Star({
  color = "var(--pink)",
  size = 28,
  rotate = 0,
  className,
  style,
}: {
  color?: string;
  size?: number;
  rotate?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={["star", className].filter(Boolean).join(" ")}
      style={{ color, fontSize: size, transform: `rotate(${rotate}deg)`, ...style }}
      aria-hidden="true"
    >
      ★
    </span>
  );
}

export function Divider({ color = "pink", rotate }: { color?: "pink" | "green" | "lemon"; rotate?: number }) {
  const r = rotate ?? (color === "pink" ? -1.2 : 0.8);
  return (
    <div className="divider-clip" aria-hidden="true">
      <div className={`divider ${color}`} style={{ transform: `rotate(${r}deg) scaleX(1.05)` }} />
    </div>
  );
}

/** セクション見出し: 英字テープ＋和文の小見出し＋リード */
export function SectionHead({
  label,
  color = "black",
  rotate = -1.5,
  title,
  lead,
}: {
  label: string;
  color?: TapeColor;
  rotate?: number;
  title?: string;
  lead?: ReactNode;
}) {
  return (
    <div className="sec-head">
      <Tape as="p" color={color} rotate={rotate} className="sec-title">
        {label}
      </Tape>
      {title && <h2 className="sec-sub">{title}</h2>}
      {lead && <p className="sec-lead">{lead}</p>}
    </div>
  );
}
