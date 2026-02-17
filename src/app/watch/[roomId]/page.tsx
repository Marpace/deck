"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSocket, disconnectSocket } from "@/lib/socket";
import { Slide } from "@/lib/slides";
import SlideView from "@/components/SlideView";
import FloatingEmojis from "@/components/FloatingEmojis";
import styles from "./page.module.css";

const EMOJI_OPTIONS = ["👏", "🔥", "💡", "😮", "🎉", "❤️", "👍", "🚀"];

interface FloatingEmoji {
  id: string;
  emoji: string;
  x: number;
}

export default function WatchPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const router = useRouter();

  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [connected, setConnected] = useState(false);
  const [presenterOnline, setPresenterOnline] = useState(true);
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const [lastEmoji, setLastEmoji] = useState<Record<string, number>>({});
  const roomIdRef = useRef(roomId);
  roomIdRef.current = roomId;

  // ── Socket setup ──────────────────────────────────────────────────────────
  useEffect(() => {
    const socket = getSocket();
    socket.connect();

    socket.on("connect", () => {
      setConnected(true);
      socket.emit("audience:join", { roomId: roomIdRef.current });
    });

    socket.on("disconnect", () => setConnected(false));

    // Full state sync on join/rejoin — includes current step
    socket.on("room:state", ({
      currentSlide: idx,
      currentStep: step,
      slides: sl,
    }: { currentSlide: number; currentStep: number; slides: Slide[] }) => {
      if (sl && sl.length > 0) setSlides(sl);
      setCurrentSlide(idx);
      setCurrentStep(step ?? 0);
    });

    // Presenter moved to a different slide
    socket.on("slide:changed", ({
      currentSlide: idx,
      currentStep: step,
    }: { currentSlide: number; currentStep: number }) => {
      setCurrentSlide(idx);
      setCurrentStep(step ?? 0);
    });

    // Presenter revealed a new step within the same slide
    socket.on("step:changed", ({
      currentSlide: idx,
      currentStep: step,
    }: { currentSlide: number; currentStep: number }) => {
      setCurrentSlide(idx);
      setCurrentStep(step);
    });

    socket.on("presenter:left", () => setPresenterOnline(false));

    socket.on("emoji:received", ({ emoji }: { emoji: string }) => {
      spawnEmoji(emoji);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("room:state");
      socket.off("slide:changed");
      socket.off("step:changed");
      socket.off("presenter:left");
      socket.off("emoji:received");
      disconnectSocket();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  // ── Emoji helpers ─────────────────────────────────────────────────────────
  const spawnEmoji = useCallback((emoji: string) => {
    const id = Math.random().toString(36).slice(2);
    const x = 5 + Math.random() * 90;
    setFloatingEmojis((prev) => [...prev, { id, emoji, x }]);
  }, []);

  const expireEmoji = useCallback((id: string) => {
    setFloatingEmojis((prev) => prev.filter((e) => e.id !== id));
  }, []);

  function sendEmoji(emoji: string) {
    const now = Date.now();
    const last = lastEmoji[emoji] || 0;
    if (now - last < 800) return;
    setLastEmoji((prev) => ({ ...prev, [emoji]: now }));
    getSocket().emit("audience:emoji", { roomId, emoji });
    spawnEmoji(emoji);
  }

  const slide = slides[currentSlide] ?? null;

  return (
    <div className={styles.page}>
      <FloatingEmojis emojis={floatingEmojis} onExpire={expireEmoji} />

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <button className="btn btn-ghost" onClick={() => router.push("/")}>
          ← Leave
        </button>
        <div className={styles.headerCenter}>
          <span className={styles.roomLabel}>Room</span>
          <code className={styles.roomCode}>{roomId}</code>
        </div>
        <div className={styles.headerRight}>
          <span className={`badge ${connected ? "badge-live" : "badge-offline"}`}>
            {connected ? "Connected" : "Reconnecting…"}
          </span>
        </div>
      </header>

      {/* ── Slide ───────────────────────────────────────────────────────── */}
      <main className={styles.main}>
        {!presenterOnline && (
          <div className={styles.banner}>
            ⚠ The presenter has disconnected. Waiting for them to return…
          </div>
        )}

        <div className={styles.slideWrapper}>
          <SlideView
            slide={slide}
            step={currentStep}
            currentIndex={currentSlide}
            total={slides.length}
          />
        </div>

        {/* ── Emoji toolbar ─────────────────────────────────────────────── */}
        <div className={styles.emojiBar}>
          <span className={styles.emojiLabel}>React</span>
          <div className={styles.emojiButtons}>
            {EMOJI_OPTIONS.map((emoji) => (
              <button
                key={emoji}
                className={styles.emojiBtn}
                onClick={() => sendEmoji(emoji)}
                title={`Send ${emoji}`}
                aria-label={`Send ${emoji} reaction`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <p className={styles.hint}>
          You're in view-only mode · Only the presenter can change slides
        </p>
      </main>
    </div>
  );
}
