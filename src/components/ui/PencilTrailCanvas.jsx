import React, { useEffect, useRef } from 'react';

export const PencilTrailCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const points = [];
    let isMoving = false;
    let clearTimer;

    const handleMouseMove = (e) => {
      points.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
        maxAge: 25,
        size: Math.random() * 3 + 2,
        angle: Math.random() * Math.PI * 2
      });
      if (points.length > 40) points.shift();
      isMoving = true;

      clearTimeout(clearTimer);
      clearTimer = setTimeout(() => {
        isMoving = false;
      }, 500);
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Determine pencil stroke color based on dark mode class on document element
      const isDark = document.documentElement.classList.contains('dark');
      const strokeColor = isDark ? 'rgba(255, 255, 255, ' : 'rgba(45, 45, 45, ';
      const accentColor = 'rgba(255, 77, 77, ';

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        pt.age++;

        const alpha = (1 - pt.age / pt.maxAge) * 0.4;
        if (alpha <= 0) continue;

        ctx.save();
        ctx.translate(pt.x, pt.y);
        ctx.rotate(pt.angle);

        // Draw small hand-drawn pencil star or cross
        ctx.strokeStyle = i % 3 === 0 ? accentColor + alpha + ')' : strokeColor + alpha + ')';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-pt.size, 0);
        ctx.lineTo(pt.size, 0);
        ctx.moveTo(0, -pt.size);
        ctx.lineTo(0, pt.size);
        ctx.stroke();

        ctx.restore();
      }

      // Remove dead points
      for (let i = points.length - 1; i >= 0; i--) {
        if (points[i].age >= points[i].maxAge) {
          points.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 opacity-70"
    />
  );
};
