"use client";
import styles from "./Slide1.module.css";
import Image from "next/image";

interface Props {
  step: number; // 0 = base layout, 1 = Context, 2 = Specificity, 3 = Constraint
}

export default function Slide1_InitialPrompt({ step }: Props) {
  return (
    <div
      className="slide-area"
      style={{ background: "#221e1eff" }}
    >

      <div className="slide-content">
        <h2 className="slide-title">Welcome to Deck</h2>
        <p className="slide-body">Real-time presentations</p>
      </div>

    </div>
  );
}
