/**
 * High-Fidelity Casino Sound Synthesizer using Web Audio API
 * Produces authentic slot machine bells, triumphant winning fanfare,
 * and cascading metal coin clatter with 0ms latency and 0 external network dependencies.
 */

class CasinoAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Check saved audio preference
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("megawins_sound_muted");
      this.isMuted = saved === "true";
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== "undefined") {
      localStorage.setItem("megawins_sound_muted", String(this.isMuted));
    }
    if (!this.isMuted) {
      this.playCoinClink();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Quick metallic coin drop sound (e.g. on button hover or tap)
   */
  public playCoinClink(frequency: number = 3200) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, now);
    osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, now + 0.04);
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.8, now + 0.12);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  /**
   * Full authentic Casino Winning Sound:
   * 1. Rising celebratory fanfare arpeggio
   * 2. Mechanical slot bells ringing
   * 3. Cascading gold coins pouring into tray
   */
  public playCasinoWinningSound() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Triumphant Fanfare Chords (C Major -> E -> G -> High C -> E -> G)
    const notes = [
      { freq: 523.25, time: 0.00, dur: 0.14 }, // C5
      { freq: 659.25, time: 0.12, dur: 0.14 }, // E5
      { freq: 783.99, time: 0.24, dur: 0.16 }, // G5
      { freq: 1046.50, time: 0.38, dur: 0.22 }, // C6
      { freq: 1318.51, time: 0.52, dur: 0.24 }, // E6
      { freq: 1567.98, time: 0.68, dur: 0.45 }, // G6 (sustained climax)
      { freq: 2093.00, time: 0.85, dur: 0.60 }, // High C7 (Grand Jackpot note)
    ];

    notes.forEach((n) => {
      const osc = ctx.createOscillator();
      const oscHarmonic = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(n.freq, now + n.time);

      // Add brassy sparkle harmonic
      oscHarmonic.type = "sine";
      oscHarmonic.frequency.setValueAtTime(n.freq * 2, now + n.time);

      gain.gain.setValueAtTime(0, now + n.time);
      gain.gain.linearRampToValueAtTime(0.25, now + n.time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.time + n.dur);

      osc.connect(gain);
      oscHarmonic.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + n.time);
      oscHarmonic.start(now + n.time);
      osc.stop(now + n.time + n.dur);
      oscHarmonic.stop(now + n.time + n.dur);
    });

    // 2. High-Pitched Casino Slot Bells Ringing (Classic Ding-Ding-Ding!)
    const bellPitches = [1760, 2093, 2349, 2637, 3136];
    bellPitches.forEach((freq, idx) => {
      const bellTime = 0.2 + idx * 0.15;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + bellTime);

      gain.gain.setValueAtTime(0.18, now + bellTime);
      gain.gain.exponentialRampToValueAtTime(0.001, now + bellTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + bellTime);
      osc.stop(now + bellTime + 0.36);
    });

    // 3. Continuous Cascading Gold Coin Clatter (18 fast coin hits dropping)
    const coinCount = 20;
    for (let i = 0; i < coinCount; i++) {
      const dropTime = 0.4 + i * 0.07 + Math.random() * 0.04;
      const coinFreq = 2600 + Math.random() * 1600;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(coinFreq, now + dropTime);
      osc.frequency.exponentialRampToValueAtTime(coinFreq * 1.3, now + dropTime + 0.03);
      osc.frequency.exponentialRampToValueAtTime(coinFreq * 0.7, now + dropTime + 0.09);

      gain.gain.setValueAtTime(0.12, now + dropTime);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dropTime + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + dropTime);
      osc.stop(now + dropTime + 0.11);
    }
  }

  /**
   * Fast reel spin effect
   */
  public playSpinEffect() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    for (let i = 0; i < 6; i++) {
      const tickTime = i * 0.05;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(450 + i * 80, now + tickTime);

      gain.gain.setValueAtTime(0.08, now + tickTime);
      gain.gain.exponentialRampToValueAtTime(0.001, now + tickTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + tickTime);
      osc.stop(now + tickTime + 0.05);
    }
  }
}

export const casinoAudio = new CasinoAudioEngine();
