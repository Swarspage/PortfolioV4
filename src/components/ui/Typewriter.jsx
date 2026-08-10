import React, { useState, useEffect } from 'react';

export const Typewriter = ({ words, delay = 150, pause = 1500 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    
    if (isDeleting) {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(prev => prev.slice(0, -1));
        }, delay / 2);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      const fullText = words[currentWordIndex];
      if (currentText.length < fullText.length) {
        timeout = setTimeout(() => {
          setCurrentText(prev => fullText.slice(0, prev.length + 1));
        }, delay);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pause);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, delay, pause]);

  return (
    <span className="inline-flex items-center">
      <span>{currentText}</span>
      <span className="inline-block w-[3px] h-[1em] bg-[#ff4d4d] ml-1 animate-pulse" />
    </span>
  );
};
