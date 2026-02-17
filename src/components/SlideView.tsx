"use client";
import { Slide } from "@/lib/slides";
import { SLIDE_COMPONENTS } from "./SlideRegistry";
import styles from "./SlideView.module.css";

interface Props {
  slide: Slide | null;
  step: number;
  currentIndex: number;
  total: number;
}

export default function SlideView({ slide, step, currentIndex, total }: Props) {
  if (!slide) {
    return (
      <div className="slide-area">
        <div className="slide-content">
          <p className={styles.waiting}>Waiting for presenter…</p>
        </div>
      </div>
    );
  }

  const SlideComponent = SLIDE_COMPONENTS[slide.component];

  if (!SlideComponent) {
    return (
      <div className="slide-area">
        <div className="slide-content">
          <p className={styles.waiting}>Unknown slide: {slide.component}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="slide-area" style={{ background: "#0f0f0f" }}>
      <SlideComponent step={step} />
      <span className="slide-number">
        {currentIndex + 1} / {total}
      </span>
    </div>
  );
}
