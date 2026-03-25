import { useRef, useCallback } from 'react';

export const useSound = () => {
  const correctSound = useRef<HTMLAudioElement | null>(null);
  const incorrectSound = useRef<HTMLAudioElement | null>(null);
  const finishedSound = useRef<HTMLAudioElement | null>(null);

  const initializeSounds = useCallback(() => {
    correctSound.current = new Audio('/correct.mp3');
    incorrectSound.current = new Audio('/incorrect.mp3');
    finishedSound.current = new Audio('/finished.mp3');
    
    // Sätt preload attribut istället för .load()
    [correctSound, incorrectSound, finishedSound].forEach(sound => {
      if (sound.current) {
        sound.current.preload = 'auto';
      }
    });
  }, []);

  const playCorrect = useCallback(() => {
    if (correctSound.current) {
      correctSound.current.currentTime = 0;
      correctSound.current.play().catch(() => {});
    }
  }, []);

  const playIncorrect = useCallback(() => {
    if (incorrectSound.current) {
      incorrectSound.current.currentTime = 0;
      incorrectSound.current.play().catch(() => {});
    }
  }, []);

  const playFinished = useCallback(() => {
    if (finishedSound.current) {
      finishedSound.current.currentTime = 0;
      finishedSound.current.play().catch(() => {});
    }
  }, []);

  return { initializeSounds, playCorrect, playIncorrect, playFinished };
};