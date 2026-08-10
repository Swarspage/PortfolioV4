import React, { useState, useEffect, useRef } from 'react';
import { Edit3, Trash2, X } from 'lucide-react';
import { soundManager } from '../../utils/soundFx';

export const DoodleCanvas = () => {
  const [isActive, setIsActive] = useState(false);
  const [penColor, setPenColor] = useState('#ff4d4d');
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPoint = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const updateCanvasSize = () => {
      const docWidth = document.documentElement.scrollWidth || window.innerWidth;
      const docHeight = document.documentElement.scrollHeight || window.innerHeight;

      // Only resize if enlarged to prevent clearing drawing
      if (canvas.width < docWidth || canvas.height < docHeight) {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        if (canvas.width > 0) tempCtx.drawImage(canvas, 0, 0);

        canvas.width = docWidth;
        canvas.height = docHeight;

        if (tempCanvas.width > 0) ctx.drawImage(tempCanvas, 0, 0);
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const getPageCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    if (!isActive) return;
    soundManager.playClick();
    isDrawing.current = true;
    lastPoint.current = getPageCoords(e);
  };

  const draw = (e) => {
    if (!isActive || !isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const coords = getPageCoords(e);

    ctx.strokeStyle = penColor;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();

    lastPoint.current = coords;
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    soundManager.playPop();
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <>
      {/* Scrollable Absolute Canvas Overlay over full page height */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className={`absolute top-0 left-0 w-full z-40 ${isActive ? 'pointer-events-auto cursor-crosshair' : 'pointer-events-none'}`}
      />

      {/* Floating Toggle Button (Fixed Bottom Left) */}
      <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 select-none">
        <button
          onClick={() => {
            soundManager.playPop();
            setIsActive(!isActive);
          }}
          className={`flex items-center gap-2 px-3.5 py-2 border-2 border-[var(--color-ink)] rounded-full font-handwriting font-bold text-sm shadow-hard-md transition-all ${
            isActive ? 'bg-[#ff4d4d] text-white scale-105 animate-pulse' : 'bg-[var(--color-postit)] text-[var(--color-ink)] hover:scale-105'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>{isActive ? 'Doodling Active! ✏️' : 'Doodle Mode 🎨'}</span>
        </button>

        {isActive && (
          <div className="flex items-center gap-2 bg-[var(--color-surface)] border-2 border-[var(--color-ink)] p-1.5 rounded-full shadow-hard-md animate-float">
            {['#ff4d4d', '#2d5da1', '#88CE02', '#2d2d2d'].map((c) => (
              <button
                key={c}
                onClick={() => {
                  soundManager.playClick();
                  setPenColor(c);
                }}
                className={`w-6 h-6 rounded-full border-2 border-[var(--color-ink)] transition-transform ${penColor === c ? 'scale-125 shadow-hard-sm' : 'hover:scale-110'}`}
                style={{ backgroundColor: c }}
              />
            ))}
            <button
              onClick={clearCanvas}
              title="Clear Doodle"
              className="p-1 text-[var(--color-ink)] hover:text-[#ff4d4d] transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                soundManager.playPop();
                setIsActive(false);
              }}
              title="Close"
              className="p-1 text-[var(--color-ink)] hover:text-[#ff4d4d] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
