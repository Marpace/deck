"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSocket, disconnectSocket } from "@/lib/socket";
import { SLIDES } from "@/lib/slides";
import SlideView from "@/components/SlideView";
import FloatingEmojis from "@/components/FloatingEmojis";
import styles from "./page.module.css";

interface FloatingEmoji {
  id: string;
  emoji: string;
  x: number;
}

export default function PresentPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const router = useRouter();

  const slides = SLIDES;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [audienceCount, setAudienceCount] = useState(0);
  const [connected, setConnected] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const [copied, setCopied] = useState(false);

  // Keep refs in sync for keyboard handler
  const slideRef = useRef(currentSlide);
  const stepRef = useRef(currentStep);
  slideRef.current = currentSlide;
  stepRef.current = currentStep;

  // ── Socket setup ──────────────────────────────────────────────────────────
  useEffect(() => {
    const socket = getSocket();
    socket.connect();

    socket.on("connect", () => {
      setConnected(true);
      socket.emit("presenter:join", {
        roomId,
        slides: slides.map((s) => ({ ...s })),
      });
    });

    socket.on("disconnect", () => setConnected(false));

    socket.on("audience:count", ({ count }: { count: number }) => {
      setAudienceCount(count);
    });

    socket.on("emoji:received", ({ emoji }: { emoji: string }) => {
      spawnEmoji(emoji);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("audience:count");
      socket.off("emoji:received");
      disconnectSocket();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  // ── Step-aware navigation ─────────────────────────────────────────────────
  // "Next" either:
  //   1. Advances the step within the current slide, OR
  //   2. Moves to the next slide (resetting step to 0)
  function handleNext() {
    const slide = slides[slideRef.current];
    if (!slide) return;

    if (stepRef.current < slide.totalSteps) {
      // Advance step within same slide
      const newStep = stepRef.current + 1;
      setCurrentStep(newStep);
      getSocket().emit("presenter:step", {
        roomId,
        slideIndex: slideRef.current,
        stepIndex: newStep,
      });
    } else {
      // All steps done — go to next slide
      const nextSlide = slideRef.current + 1;
      if (nextSlide >= slides.length) return;
      setCurrentSlide(nextSlide);
      setCurrentStep(0);
      getSocket().emit("presenter:slide", {
        roomId,
        slideIndex: nextSlide,
        stepIndex: 0,
      });
    }
  }

  function handlePrev() {
    if (stepRef.current > 0) {
      // Go back a step within the same slide
      const prevStep = stepRef.current - 1;
      setCurrentStep(prevStep);
      getSocket().emit("presenter:step", {
        roomId,
        slideIndex: slideRef.current,
        stepIndex: prevStep,
      });
    } else {
      // Go to previous slide, at its last step
      const prevSlide = slideRef.current - 1;
      if (prevSlide < 0) return;
      const prevTotalSteps = slides[prevSlide]?.totalSteps ?? 0;
      setCurrentSlide(prevSlide);
      setCurrentStep(prevTotalSteps);
      getSocket().emit("presenter:slide", {
        roomId,
        slideIndex: prevSlide,
        stepIndex: prevTotalSteps,
      });
    }
  }

  function goToSlide(index: number) {
    if (index < 0 || index >= slides.length) return;
    setCurrentSlide(index);
    setCurrentStep(0);
    getSocket().emit("presenter:slide", { roomId, slideIndex: index, stepIndex: 0 });
  }

  // ── Emoji ─────────────────────────────────────────────────────────────────
  const spawnEmoji = useCallback((emoji: string) => {
    const id = Math.random().toString(36).slice(2);
    const x = 5 + Math.random() * 90;
    setFloatingEmojis((prev) => [...prev, { id, emoji, x }]);
  }, []);

  const expireEmoji = useCallback((id: string) => {
    setFloatingEmojis((prev) => prev.filter((e) => e.id !== id));
  }, []);

  // ── Copy room link ────────────────────────────────────────────────────────
  function copyLink() {
    const url = `${window.location.origin}/watch/${roomId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  // ── Keyboard shortcuts ────────────────────────────────────────────────────
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        handleNext();
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        handlePrev();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const slide = slides[currentSlide] ?? null;
  const totalSteps = slide?.totalSteps ?? 0;
  const isLastStep = currentStep >= totalSteps;
  const isLastSlide = currentSlide === slides.length - 1;
  const isFirst = currentSlide === 0 && currentStep === 0;

  return (
    <div className={styles.page}>
      <FloatingEmojis emojis={floatingEmojis} onExpire={expireEmoji} />

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <button className="btn btn-ghost" onClick={() => router.push("/")}>
          ← Back
        </button>

        <div className={styles.headerCenter}>
          <span className={styles.roomLabel}>Room</span>
          <code className={styles.roomCode}>{roomId}</code>
          <button className="btn btn-ghost" onClick={copyLink}>
            {copied ? "✓ Copied" : "Copy Link"}
          </button>
        </div>

        <div className={styles.headerRight}>
          <span className={`badge ${connected ? "badge-live" : "badge-offline"}`}>
            {connected ? "Live" : "Connecting…"}
          </span>
          <span className={styles.audience}>{audienceCount} watching</span>
        </div>
      </header>

      {/* ── Slide ───────────────────────────────────────────────────────── */}
      <main className={styles.main}>
        <div className={styles.slideWrapper}>
          <SlideView
            slide={slide}
            step={currentStep}
            currentIndex={currentSlide}
            total={slides.length}
          />
        </div>

        {/* ── Controls ─────────────────────────────────────────────────── */}
        <div className={styles.controls}>
          <button
            className="btn btn-ghost"
            onClick={handlePrev}
            disabled={isFirst}
          >
            ← Prev
          </button>

          {/* Step pips + slide dots */}
          <div className={styles.progress}>
            {slides.map((s, si) => (
              <div key={si} className={styles.slideGroup}>
                <button
                  className={`${styles.slideDot} ${si === currentSlide ? styles.slideDotActive : ""}`}
                  onClick={() => goToSlide(si)}
                  aria-label={`Go to slide ${si + 1}`}
                />
                {/* Step pips for this slide */}
                {si === currentSlide && s.totalSteps > 0 && (
                  <div className={styles.stepPips}>
                    {Array.from({ length: s.totalSteps }).map((_, pi) => (
                      <span
                        key={pi}
                        className={`${styles.pip} ${pi < currentStep ? styles.pipDone : ""}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            className="btn btn-primary"
            onClick={handleNext}
            disabled={isLastSlide && isLastStep}
          >
            {isLastStep ? "Next →" : `Reveal (${currentStep}/${totalSteps})`}
          </button>
        </div>

        <p className={styles.hint}>
          Space / → to advance · ← to go back · Arrow keys supported
        </p>
      </main>
    </div>
  );
}
