// Gaming sound effects using Web Audio API

class SoundManager {
  private audioContext: AudioContext | null = null;
  private musicGainNode: GainNode | null = null;
  private isMusicPlaying: boolean = false;
  private musicStopFlag: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.musicGainNode = this.audioContext.createGain();
      this.musicGainNode.connect(this.audioContext.destination);
      this.musicGainNode.gain.value = 0.15; // Background music at 15% volume
    }
  }

  private createOscillator(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Button click sound
  playClick() {
    this.createOscillator(800, 0.1, 'square');
  }

  // Epic play button sound
  playEpicStart() {
    if (!this.audioContext) return;

    // Power up sound
    const frequencies = [200, 300, 400, 500, 600];
    frequencies.forEach((freq, i) => {
      setTimeout(() => {
        this.createOscillator(freq, 0.15, 'sawtooth');
      }, i * 50);
    });
  }

  // Game start sound
  playGameStart() {
    if (!this.audioContext) return;

    // Ascending arpeggio
    const notes = [262, 330, 392, 523]; // C, E, G, C
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.createOscillator(freq, 0.2, 'triangle');
      }, i * 100);
    });
  }

  // Choice selection sound
  playChoiceSelect() {
    this.createOscillator(600, 0.15, 'square');
    setTimeout(() => {
      this.createOscillator(800, 0.1, 'square');
    }, 50);
  }

  // Round win sound
  playRoundWin() {
    if (!this.audioContext) return;

    // Victory jingle
    const melody = [523, 659, 784, 1047]; // C, E, G, C (high)
    melody.forEach((freq, i) => {
      setTimeout(() => {
        this.createOscillator(freq, 0.25, 'sine');
      }, i * 120);
    });
  }

  // Round lose sound
  playRoundLose() {
    if (!this.audioContext) return;

    // Descending sad trombone
    const melody = [400, 350, 300, 250];
    melody.forEach((freq, i) => {
      setTimeout(() => {
        this.createOscillator(freq, 0.3, 'sawtooth');
      }, i * 150);
    });
  }

  // Epic victory sound
  playVictory() {
    if (!this.audioContext) return;

    // Epic fanfare
    const fanfare = [
      { freq: 523, delay: 0 },
      { freq: 659, delay: 150 },
      { freq: 784, delay: 300 },
      { freq: 1047, delay: 450 },
      { freq: 784, delay: 600 },
      { freq: 1047, delay: 700 },
      { freq: 1319, delay: 850 },
    ];

    fanfare.forEach(({ freq, delay }) => {
      setTimeout(() => {
        this.createOscillator(freq, 0.3, 'triangle');
      }, delay);
    });
  }

  // Game over loss sound (dramatic)
  playDefeat() {
    if (!this.audioContext) return;

    // Dramatic descending doom sound
    const doom = [600, 500, 400, 300, 200, 150, 100];
    doom.forEach((freq, i) => {
      setTimeout(() => {
        this.createOscillator(freq, 0.4, 'sawtooth');
      }, i * 100);
    });
  }

  // Tie sound
  playTie() {
    if (!this.audioContext) return;

    // Neutral alternating beeps
    [400, 500, 400, 500].forEach((freq, i) => {
      setTimeout(() => {
        this.createOscillator(freq, 0.15, 'square');
      }, i * 150);
    });
  }

  // Waiting/loading sound
  playWaiting() {
    this.createOscillator(440, 0.1, 'sine');
    setTimeout(() => {
      this.createOscillator(554, 0.1, 'sine');
    }, 200);
  }

  // Countdown tick
  playTick() {
    this.createOscillator(1000, 0.05, 'square');
  }

  // Background music - looping retro gaming track
  private playMusicNote(frequency: number, startTime: number, duration: number) {
    if (!this.audioContext || !this.musicGainNode) return;

    const oscillator = this.audioContext.createOscillator();
    oscillator.connect(this.musicGainNode);
    oscillator.frequency.value = frequency;
    oscillator.type = 'square';

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  }

  private playMusicLoop() {
    if (!this.audioContext || this.musicStopFlag) {
      this.isMusicPlaying = false;
      return;
    }

    const currentTime = this.audioContext.currentTime;
    const beatDuration = 0.25; // 240 BPM (each beat is 0.25s)

    // Epic gaming melody - inspired by classic arcade games
    const melody = [
      // Bar 1
      { note: 523, duration: beatDuration }, // C5
      { note: 659, duration: beatDuration }, // E5
      { note: 784, duration: beatDuration }, // G5
      { note: 1047, duration: beatDuration }, // C6
      // Bar 2
      { note: 987, duration: beatDuration }, // B5
      { note: 784, duration: beatDuration }, // G5
      { note: 659, duration: beatDuration }, // E5
      { note: 523, duration: beatDuration }, // C5
      // Bar 3
      { note: 587, duration: beatDuration }, // D5
      { note: 740, duration: beatDuration }, // F#5
      { note: 880, duration: beatDuration }, // A5
      { note: 1175, duration: beatDuration }, // D6
      // Bar 4
      { note: 1047, duration: beatDuration }, // C6
      { note: 880, duration: beatDuration }, // A5
      { note: 740, duration: beatDuration }, // F#5
      { note: 587, duration: beatDuration * 2 }, // D5 (longer)
      { note: 0, duration: beatDuration * 2 }, // Rest
    ];

    // Bass line (lower octave)
    const bass = [
      { note: 262, duration: beatDuration * 4 }, // C4
      { note: 294, duration: beatDuration * 4 }, // D4
      { note: 330, duration: beatDuration * 4 }, // E4
      { note: 294, duration: beatDuration * 4 }, // D4
    ];

    let time = currentTime;

    // Play melody
    melody.forEach(({ note, duration }) => {
      if (note > 0) {
        this.playMusicNote(note, time, duration * 0.9);
      }
      time += duration;
    });

    // Play bass (lower volume by creating separate gain)
    time = currentTime;
    bass.forEach(({ note, duration }) => {
      if (this.audioContext && this.musicGainNode) {
        const oscillator = this.audioContext.createOscillator();
        const bassGain = this.audioContext.createGain();

        oscillator.connect(bassGain);
        bassGain.connect(this.musicGainNode);

        oscillator.frequency.value = note;
        oscillator.type = 'triangle';
        bassGain.gain.value = 0.5; // Bass is 50% of music volume

        oscillator.start(time);
        oscillator.stop(time + duration * 0.9);
      }
      time += duration;
    });

    // Schedule next loop
    const loopDuration = melody.reduce((sum, { duration }) => sum + duration, 0);
    setTimeout(() => {
      if (this.isMusicPlaying) {
        this.playMusicLoop();
      }
    }, loopDuration * 1000 - 100); // Start slightly before to avoid gaps
  }

  startBackgroundMusic() {
    if (this.isMusicPlaying) return;

    this.isMusicPlaying = true;
    this.musicStopFlag = false;
    this.playMusicLoop();
  }

  stopBackgroundMusic() {
    this.musicStopFlag = true;
    this.isMusicPlaying = false;
  }

  setMusicVolume(volume: number) {
    if (this.musicGainNode) {
      this.musicGainNode.gain.value = Math.max(0, Math.min(1, volume));
    }
  }
}

// Singleton instance
let soundManager: SoundManager | null = null;

export const getSoundManager = () => {
  if (!soundManager && typeof window !== 'undefined') {
    soundManager = new SoundManager();
  }
  return soundManager;
};
