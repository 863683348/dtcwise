"use client";

import Link from "next/link";
import type { CSSProperties, MouseEvent, ReactNode } from "react";

type Props = {
  href: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

// 客户端链接包装：在卡片上挂载 card-spotlight 光标跟随水波纹。
// 鼠标移动时把卡内坐标写进 --mx/--my，由 globals.css 的 .card-spotlight::before 绘制跟随光晕。
export default function SpotlightLink({ href, className, style, children }: Props) {
  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <Link href={href} className={className} style={style} onMouseMove={handleMouseMove}>
      {children}
    </Link>
  );
}
