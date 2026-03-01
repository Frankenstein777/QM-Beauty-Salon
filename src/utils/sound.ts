// A lightweight utility for playing subtle UI notification sounds using Web Audio API

class SoundService {
    private audioCtx: AudioContext | null = null;
    private hasUserInteracted: boolean = false;

    constructor() {
        if (typeof window !== 'undefined') {
            const unlockAudio = () => {
                this.hasUserInteracted = true;
                window.removeEventListener('click', unlockAudio);
                window.removeEventListener('touchstart', unlockAudio);
                window.removeEventListener('keydown', unlockAudio);
            };

            window.addEventListener('click', unlockAudio);
            window.addEventListener('touchstart', unlockAudio);
            window.addEventListener('keydown', unlockAudio);
        }
    }

    private init() {
        if (!this.audioCtx && typeof window !== 'undefined' && this.hasUserInteracted) {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) {
                this.audioCtx = new AudioContextClass();
            }
        }
    }

    playPop() {
        this.init();
        if (!this.audioCtx) return;
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

        try {
            const osc = this.audioCtx.createOscillator();
            const gainNode = this.audioCtx.createGain();

            osc.type = 'sine';

            // Fast pop envelope
            osc.frequency.setValueAtTime(800, this.audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(300, this.audioCtx.currentTime + 0.1);

            gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.15, this.audioCtx.currentTime + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.1);

            osc.connect(gainNode);
            gainNode.connect(this.audioCtx.destination);

            osc.start();
            osc.stop(this.audioCtx.currentTime + 0.1);
        } catch (e) {
            // Ignore Web Audio API throwing errors on unsupported browsers/interactions
        }
    }

    playSuccess() {
        this.init();
        if (!this.audioCtx) return;
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

        try {
            const osc1 = this.audioCtx.createOscillator();
            const osc2 = this.audioCtx.createOscillator();
            const gainNode = this.audioCtx.createGain();

            osc1.type = 'sine';
            osc2.type = 'sine';

            // Pleasant chime chord
            osc1.frequency.setValueAtTime(523.25, this.audioCtx.currentTime); // C5
            osc2.frequency.setValueAtTime(783.99, this.audioCtx.currentTime); // G5

            gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, this.audioCtx.currentTime + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.4);

            osc1.connect(gainNode);
            osc2.connect(gainNode);
            gainNode.connect(this.audioCtx.destination);

            osc1.start();
            osc2.start();
            osc1.stop(this.audioCtx.currentTime + 0.4);
            osc2.stop(this.audioCtx.currentTime + 0.4);
        } catch (e) {
            // Ignore
        }
    }
}

export const soundService = new SoundService();
