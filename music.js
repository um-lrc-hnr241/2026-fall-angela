const button = document.querySelector("#music-toggle");

if (button) {
  let audioContext;
  let masterGain;
  let oscillators = [];
  let playing = false;

  const stopMusic = () => {
    if (!playing) return;
    playing = false;
    masterGain.gain.setTargetAtTime(0, audioContext.currentTime, 0.25);
    window.setTimeout(() => {
      oscillators.forEach((oscillator) => oscillator.stop());
      oscillators = [];
      audioContext.close();
      audioContext = undefined;
      masterGain = undefined;
    }, 1000);
    button.textContent = "Play ambient space music";
    button.setAttribute("aria-pressed", "false");
  };

  button.addEventListener("click", async () => {
    if (playing) {
      stopMusic();
      return;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      button.textContent = "Ambient music is not supported in this browser";
      button.disabled = true;
      return;
    }

    audioContext = new AudioContext();
    await audioContext.resume();
    masterGain = audioContext.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(audioContext.destination);

    [110, 164.81, 220].forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const voiceGain = audioContext.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      voiceGain.gain.value = index === 0 ? 0.24 : 0.12;
      oscillator.connect(voiceGain);
      voiceGain.connect(masterGain);
      oscillator.start();
      oscillators.push(oscillator);
    });

    masterGain.gain.setTargetAtTime(0.12, audioContext.currentTime, 1.2);
    playing = true;
    button.textContent = "Stop ambient space music";
    button.setAttribute("aria-pressed", "true");
  });
}
