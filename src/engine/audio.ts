// A simple Web Audio API synthesizer for game sounds
class AudioManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  private init() {
    if (!this.ctx && this.enabled) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        this.ctx = new AudioContextClass();
      } catch (e) {
        console.warn('Web Audio API not supported', e);
        this.enabled = false;
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, type: OscillatorType, duration: number, vol = 0.1) {
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  public playPlaceSound() {
    // A soft, low "thud" or "click"
    this.playTone(150, 'sine', 0.1, 0.2);
    setTimeout(() => this.playTone(200, 'sine', 0.1, 0.1), 20);
  }

  public playClearSound(combo: number) {
    // A bright, ascending chime that gets higher with combo
    const baseFreq = 400 + (combo * 100);
    this.playTone(baseFreq, 'square', 0.3, 0.1);
    setTimeout(() => this.playTone(baseFreq * 1.5, 'sine', 0.4, 0.1), 50);
    if (combo > 1) {
      setTimeout(() => this.playTone(baseFreq * 2, 'sine', 0.5, 0.1), 100);
    }
  }

  public playGameOverSound() {
    // A descending, sad tone
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 1);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 1);
  }
}

export const audioManager = new AudioManager();
