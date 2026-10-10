import confetti from "canvas-confetti";
import { useSyncExternalStore } from "react";

/** Confetti + a short synthesized fanfare (no audio files) for finishing an opening lesson. */

const MUTE_KEY = "guys-chess-tutor:muted";
const listeners = new Set<() => void>();

function readMuted(): boolean {
  try {
    return localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false;
  }
}

export function toggleMuted() {
  try {
    localStorage.setItem(MUTE_KEY, readMuted() ? "0" : "1");
  } catch {
    /* private mode — the toggle just won't stick */
  }
  listeners.forEach((l) => l());
}

export function useMuted(): boolean {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    readMuted,
    readMuted,
  );
}

/** C–E–G–C arpeggio, then a sparkly chord. ~1.3s. */
function playFanfare() {
  const Ctx =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctx) return;
  const ctx = new Ctx();
  const master = ctx.createGain();
  master.gain.value = 0.18;
  master.connect(ctx.destination);

  const note = (freq: number, start: number, dur: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    const t = ctx.currentTime + start;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(1, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(gain).connect(master);
    osc.start(t);
    osc.stop(t + dur);
  };

  [523.25, 659.25, 783.99].forEach((f, i) => note(f, i * 0.11, 0.25));
  [1046.5, 783.99, 659.25].forEach((f) => note(f, 0.36, 0.95));
  window.setTimeout(() => ctx.close(), 1600);
}

export function celebrate() {
  if (!readMuted()) playFanfare();
  const colors = ["#14b8a6", "#ffb020", "#6366f1", "#f43f5e", "#ffffff"];
  const shoot = (x: number, angle: number) =>
    confetti({
      particleCount: 90,
      spread: 70,
      angle,
      origin: { x, y: 0.75 },
      colors,
      disableForReducedMotion: true,
    });
  shoot(0.1, 60);
  shoot(0.9, 120);
  window.setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 120,
      startVelocity: 35,
      origin: { y: 0.35 },
      colors,
      disableForReducedMotion: true,
    });
  }, 350);
}
