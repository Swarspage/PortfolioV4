import React, { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Play, Check, Terminal, Sparkles } from 'lucide-react';
import gsap from 'gsap';

export const MiniCodeSandbox = () => {
  const [activeTab, setActiveTab] = useState('code');
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);

  const handleRun = () => {
    setIsRunning(true);
    setActiveTab('output');

    setLogs(['> Initializing Swar.OS v4.0...', '> Compiling React + Vite...']);

    setTimeout(() => {
      setLogs(prev => [
        ...prev,
        '✨ SUCCESS: Ready for hire!',
        '💡 TIP: Click my photo or drag the stickers!'
      ]);
      setIsRunning(false);

      // Bounce effect on output
      gsap.fromTo('.sandbox-output', { scale: 0.95 }, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' });
    }, 600);
  };

  return (
    <Card
      variant="default"
      decoration="tack"
      rotate="slightRight"
      className="w-full max-w-sm p-4 bg-[var(--color-surface)] border-2 border-[var(--color-ink)] shadow-hard-md text-left font-mono text-sm relative"
    >
      {/* Terminal Header Bar */}
      <div className="flex items-center justify-between border-b-2 border-[var(--color-ink)] pb-2 mb-3">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff4d4d] border border-[var(--color-ink)]" />
          <div className="w-3 h-3 rounded-full bg-[#F7DF1E] border border-[var(--color-ink)]" />
          <div className="w-3 h-3 rounded-full bg-[#88CE02] border border-[var(--color-ink)]" />
          <span className="ml-2 text-xs font-bold text-[var(--color-ink)] font-handwriting">developer.js</span>
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('code')}
            className={`px-2 py-0.5 text-xs font-bold border border-[var(--color-ink)] rounded ${activeTab === 'code' ? 'bg-[#2d2d2d] text-white' : 'bg-[var(--color-bg)] text-[var(--color-ink)]'}`}
          >
            Code
          </button>
          <button
            onClick={() => setActiveTab('output')}
            className={`px-2 py-0.5 text-xs font-bold border border-[var(--color-ink)] rounded ${activeTab === 'output' ? 'bg-[#2d2d2d] text-white' : 'bg-[var(--color-bg)] text-[var(--color-ink)]'}`}
          >
            Output {logs.length > 0 && '🟢'}
          </button>
        </div>
      </div>

      {/* Code Tab */}
      {activeTab === 'code' ? (
        <div className="space-y-1 text-xs text-[var(--color-ink)]/90 leading-relaxed font-bold">
          <p><span className="text-[#ff4d4d]">const</span> developer = {'{'}</p>
          <p className="pl-4">name: <span className="text-[#2d5da1]">'Swar Shinde'</span>,</p>
          <p className="pl-4">status: <span className="text-[#88CE02]">'Available'</span>,</p>
          <p className="pl-4">skills: [<span className="text-[#2d5da1]">'React'</span>, <span className="text-[#2d5da1]">'Node'</span>, <span className="text-[#2d5da1]">'GSAP'</span>]</p>
          <p>{'}'};</p>
          <p className="pt-1 text-[var(--color-ink)]/60">// Click run to execute!</p>
        </div>
      ) : (
        /* Output Tab */
        <div className="sandbox-output space-y-1.5 text-xs font-bold min-h-[96px] text-[var(--color-ink)]">
          {logs.length === 0 ? (
            <p className="text-[var(--color-ink)]/50 italic">&gt; Click "Run Code" below to build...</p>
          ) : (
            logs.map((log, i) => (
              <p key={i} className={log.includes('SUCCESS') ? 'text-[#88CE02] font-bold' : log.includes('TIP') ? 'text-[#ff4d4d]' : 'text-[var(--color-ink)]/80'}>
                {log}
              </p>
            ))
          )}
        </div>
      )}

      {/* Action Bar */}
      <div className="mt-3 pt-2 border-t-2 border-dashed border-[var(--color-ink)]/30 flex items-center justify-between">
        <Button
          onClick={handleRun}
          disabled={isRunning}
          variant="primary"
          size="sm"
          icon={isRunning ? Check : Play}
          className="text-xs px-3 py-1"
        >
          {isRunning ? 'Compiling...' : 'Run Code 🚀'}
        </Button>
        <span className="text-[10px] font-bold text-[var(--color-ink)]/60 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#ff4d4d]" /> Live Sandbox
        </span>
      </div>
    </Card>
  );
};
