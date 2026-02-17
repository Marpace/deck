"use client";
import { useEffect, useRef } from "react";

interface FloatingEmoji {
  id: string;
  emoji: string;
  x: number;
}

interface Props {
  emojis: FloatingEmoji[];
  onExpire: (id: string) => void;
}

export default function FloatingEmojis({ emojis, onExpire }: Props) {
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    emojis.forEach((item) => {
      if (!timers.current[item.id]) {
        timers.current[item.id] = setTimeout(() => {
          onExpire(item.id);
          delete timers.current[item.id];
        }, 2900);
      }
    });
  }, [emojis, onExpire]);

  return (
    <>
      {emojis.map((item) => (
        <span
          key={item.id}
          className="floating-emoji"
          style={{ left: `${item.x}%` }}
          aria-hidden
        >
          {item.emoji}
        </span>
      ))}
    </>
  );
}
