// const time = 100;

const ctx = new AudioContext();
const g = ctx.createGain();
g.gain.value = 0.105;
g.connect(ctx.destination);

export const AudioManager = () => {
  const playSound = (fq = 440, wave = "square", length = 0.25) => {
    const o = ctx.createOscillator();
    o.type = wave;
    o.frequency.setValueAtTime(fq, ctx.currentTime); // value in hertz
    o.connect(g);
    o.start();
    o.stop(ctx.currentTime + length);
  };

  return {
    mute: false,
    init() {
      window.addEventListener("keydown", e => {
        switch (e.key) {
          case "m":
            this.toggleMute();
            break;
        }
      });
    },
    playBrick(index) {
      if (!this.mute) playSound(index % 2 ? 440 : 293.7);
    },
    playBall() {
      if (!this.mute) playSound(220);
    },
    playMiss() {
      if (!this.mute) playSound(98);
    },
    playGameover() {
      if (!this.mute) playSound(55, "square", 1);
    },
    toggleMute() {
      this.mute = !this.mute;
    },
    setMute(value) {
      this.mute = value;
    },
    testFq(value) {
      playSound(value);
    }
  };
};
