// src/utils/audioManager.ts
let currentAudio: HTMLAudioElement | null = null;

export const playAudio = (src: string, volume = 0.85): HTMLAudioElement | null => {
  stopAudio();
  const audio = new Audio(src);
  audio.volume = volume;
  currentAudio = audio;
  audio.play().catch(() => {});
  audio.addEventListener('ended', () => {
    if (currentAudio === audio) currentAudio = null;
  });
  return audio;
};

export const stopAudio = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
};