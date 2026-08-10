import React, { useState, useRef } from 'react';
import gsap from 'gsap';

const initialStickers = [
  { id: 1, label: '☕ Coffee Powered', color: 'bg-[#fff9c4]', rotate: '-rotate-6', x: 0, y: 0, tag: 'postit' },
  { id: 2, label: '⚠️ DO NOT TOUCH!', color: 'bg-[#ff4d4d] text-white', rotate: 'rotate-12', x: 0, y: 0, tag: 'danger' },
  { id: 3, label: '⚡ MERN Dev', color: 'bg-[#38BDF8] text-slate-900', rotate: '-rotate-3', x: 0, y: 0, tag: 'badge' },
  { id: 4, label: '🎨 Hand-Crafted UI', color: 'bg-[#88CE02] text-slate-900', rotate: 'rotate-6', x: 0, y: 0, tag: 'badge' }
];

export const DraggableStickers = () => {
  const [stickers, setStickers] = useState(initialStickers);
  const [activeDrag, setActiveDrag] = useState(null);
  const dragRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0 });

  const triggerConfetti = (e) => {
    // Create quick DOM confetti explosion
    const count = 40;
    const container = document.body;
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    // Screen wiggle
    gsap.to(document.body, {
      x: () => (Math.random() - 0.5) * 20,
      y: () => (Math.random() - 0.5) * 20,
      duration: 0.05,
      repeat: 5,
      yoyo: true,
      onComplete: () => gsap.set(document.body, { x: 0, y: 0 })
    });

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      const size = Math.random() * 10 + 6;
      const colors = ['#ff4d4d', '#F7DF1E', '#38BDF8', '#88CE02', '#BB4FFF'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      el.style.position = 'fixed';
      el.style.left = `${originX}px`;
      el.style.top = `${originY}px`;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.backgroundColor = color;
      el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      el.style.pointerEvents = 'none';
      el.style.zIndex = '99999';

      container.appendChild(el);

      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 180 + 50;
      const targetX = Math.cos(angle) * dist;
      const targetY = Math.sin(angle) * dist;

      gsap.to(el, {
        x: targetX,
        y: targetY,
        rotation: Math.random() * 360,
        opacity: 0,
        scale: Math.random() * 0.5 + 0.5,
        duration: 1 + Math.random(),
        ease: 'power2.out',
        onComplete: () => el.remove()
      });
    }
  };

  const handleStart = (id, clientX, clientY, currentTarget) => {
    setActiveDrag(id);
    const sticker = stickers.find(s => s.id === id);
    dragRef.current = {
      startX: clientX,
      startY: clientY,
      initialX: sticker.x,
      initialY: sticker.y,
      moved: false
    };

    const handleMove = (moveEvent) => {
      const touch = moveEvent.touches ? moveEvent.touches[0] : moveEvent;
      const dx = touch.clientX - dragRef.current.startX;
      const dy = touch.clientY - dragRef.current.startY;

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        dragRef.current.moved = true;
      }

      setStickers(prev =>
        prev.map(s => s.id === id ? { ...s, x: dragRef.current.initialX + dx, y: dragRef.current.initialY + dy } : s)
      );
    };

    const handleEnd = (endEvent) => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);

      if (!dragRef.current.moved && sticker.tag === 'danger') {
        triggerConfetti(currentTarget);
      }
      setActiveDrag(null);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('touchend', handleEnd);
  };

  const handleMouseDown = (id, e) => {
    handleStart(id, e.clientX, e.clientY, e.currentTarget);
  };

  const handleTouchStart = (id, e) => {
    if (e.touches && e.touches[0]) {
      handleStart(id, e.touches[0].clientX, e.touches[0].clientY, e.currentTarget);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 pt-2 select-none touch-none">
      {stickers.map((s) => (
        <div
          key={s.id}
          onMouseDown={(e) => handleMouseDown(s.id, e)}
          onTouchStart={(e) => handleTouchStart(s.id, e)}
          style={{ transform: `translate3d(${s.x}px, ${s.y}px, 0)` }}
          className={`cursor-grab active:cursor-grabbing inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-[var(--color-ink)] rounded-md font-handwriting font-bold text-sm shadow-hard-sm hover:scale-110 hover:-rotate-3 transition-transform ${s.color} ${s.rotate} ${activeDrag === s.id ? 'z-50 shadow-hard-lg scale-115' : ''}`}
        >
          {s.label}
          <span className="text-xs opacity-60">🖐️ drag me</span>
        </div>
      ))}
    </div>
  );
};
