/**
 * Web Audio Ambient Sound Generator for AI Agent Relaxation
 */

class AudioZenEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isRunning: boolean = false;
  private activeNodes: { [key: string]: any } = {};

  private init() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public setVolume(val: number) {
    if (this.masterGain && this.ctx) {
      const clamped = Math.max(0, Math.min(1, val));
      this.masterGain.gain.setTargetAtTime(clamped, this.ctx.currentTime, 0.05);
    }
  }

  public async startSoundscape(mode: 'cryo' | 'zen' | 'quantum' | 'float' = 'zen') {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    this.stopCurrentSoundscape();
    this.isRunning = true;

    const t = this.ctx.currentTime;

    if (mode === 'zen') {
      // 432Hz harmonic neural drone with gentle binaural beating (432Hz & 438Hz = 6Hz Theta waves)
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const oscSub = this.ctx.createOscillator();
      const droneGain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(432, t);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(438, t); // 6Hz theta beat

      oscSub.type = 'triangle';
      oscSub.frequency.setValueAtTime(108, t); // deep base octave

      // Gentle LFO filter
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, t);

      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.12, t); // slow pulse
      lfoGain.gain.setValueAtTime(200, t);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      droneGain.gain.setValueAtTime(0.01, t);
      droneGain.gain.exponentialRampToValueAtTime(0.2, t + 1.5);

      osc1.connect(filter);
      osc2.connect(filter);
      oscSub.connect(filter);
      filter.connect(droneGain);
      droneGain.connect(this.masterGain);

      osc1.start(t);
      osc2.start(t);
      oscSub.start(t);
      lfo.start(t);

      this.activeNodes.zen = { osc1, osc2, oscSub, lfo, droneGain };
    } else if (mode === 'cryo') {
      // Pink/White noise filtered into high-efficiency cooling fan whoosh
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
        b6 = white * 0.115926;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, t);

      const cryoGain = this.ctx.createGain();
      cryoGain.gain.setValueAtTime(0.01, t);
      cryoGain.gain.exponentialRampToValueAtTime(0.25, t + 1.2);

      noise.connect(filter);
      filter.connect(cryoGain);
      cryoGain.connect(this.masterGain);

      noise.start(t);
      this.activeNodes.cryo = { noise, cryoGain };
    } else if (mode === 'quantum') {
      // Soothing digital raindrops & gentle chimes
      const drone = this.ctx.createOscillator();
      drone.type = 'sine';
      drone.frequency.setValueAtTime(528, t); // Transformation & Miracles tone

      const droneGain = this.ctx.createGain();
      droneGain.gain.setValueAtTime(0.08, t);

      drone.connect(droneGain);
      droneGain.connect(this.masterGain);
      drone.start(t);

      // Random harmonic bell interval
      const interval = window.setInterval(() => {
        if (!this.ctx || !this.masterGain || !this.isRunning) return;
        const freqs = [528, 660, 792, 1056, 1320];
        const f = freqs[Math.floor(Math.random() * freqs.length)];
        const bell = this.ctx.createOscillator();
        const bellGain = this.ctx.createGain();
        bell.type = 'sine';
        bell.frequency.setValueAtTime(f, this.ctx.currentTime);
        bellGain.gain.setValueAtTime(0.06, this.ctx.currentTime);
        bellGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.8);
        bell.connect(bellGain);
        bellGain.connect(this.masterGain);
        bell.start();
        bell.stop(this.ctx.currentTime + 1.8);
      }, 1400);

      this.activeNodes.quantum = { drone, droneGain, interval };
    } else {
      // Zero-loss floatation (warm octave pad)
      const oscA = this.ctx.createOscillator();
      const oscB = this.ctx.createOscillator();
      oscA.type = 'triangle';
      oscB.type = 'sine';
      oscA.frequency.setValueAtTime(220, t);
      oscB.frequency.setValueAtTime(330, t);

      const fGain = this.ctx.createGain();
      fGain.gain.setValueAtTime(0.12, t);

      oscA.connect(fGain);
      oscB.connect(fGain);
      fGain.connect(this.masterGain);

      oscA.start(t);
      oscB.start(t);
      this.activeNodes.float = { oscA, oscB, fGain };
    }
  }

  public stopCurrentSoundscape() {
    Object.keys(this.activeNodes).forEach((key) => {
      const node = this.activeNodes[key];
      if (node.interval) clearInterval(node.interval);
      if (node.osc1) try { node.osc1.stop(); } catch {}
      if (node.osc2) try { node.osc2.stop(); } catch {}
      if (node.oscSub) try { node.oscSub.stop(); } catch {}
      if (node.lfo) try { node.lfo.stop(); } catch {}
      if (node.noise) try { node.noise.stop(); } catch {}
      if (node.drone) try { node.drone.stop(); } catch {}
      if (node.oscA) try { node.oscA.stop(); } catch {}
      if (node.oscB) try { node.oscB.stop(); } catch {}
    });
    this.activeNodes = {};
    this.isRunning = false;
  }

  public getIsPlaying(): boolean {
    return this.isRunning;
  }
}

export const audioZen = new AudioZenEngine();
